from contextlib import AsyncExitStack
from pathlib import Path
from uuid import UUID

import aioboto3
from aiobotocore.config import AioConfig

from app.core.config import settings
from app.schemas import CompletedPart, SignedPart

ALLOWED_VIDEO_EXTENSIONS = {
    ".mp4",
    ".mov",
    ".webm",
    ".mkv",
    ".avi",
    ".m4v",
}

_session = aioboto3.Session()
_stack = AsyncExitStack()
_s3 = None


async def init_s3():
    global _s3
    _s3 = await _stack.enter_async_context(
        _session.client(
            "s3",
            region_name=settings.S3_AWS_REGION,
            config=AioConfig(
                signature_version="s3v4", s3={"addressing_style": "virtual"}
            ),
        )
    )


async def close_s3():
    global _s3
    await _stack.aclose()
    _s3 = None


# To avoid typing error
def _client():
    if _s3 is None:
        raise RuntimeError("S3 client not initialised. Call init_s3() at app startup.")
    return _s3


def create_video_object_key(
    *,
    owner_id: UUID,
    video_id: UUID,
    filename: str,
) -> str:
    extension = Path(filename).suffix.lower()

    if extension not in ALLOWED_VIDEO_EXTENSIONS:
        raise ValueError("Unsupported video extension")

    return f"users/{owner_id}/videos/{video_id}" f"/source/original{extension}"


async def create_s3_multipart_upload(
    *,
    object_key: str,
    content_type: str,
) -> str:
    response = await _client().create_multipart_upload(
        Bucket=settings.S3_BUCKET_NAME,
        Key=object_key,
        ContentType=content_type,
    )

    return response["UploadId"]


async def create_presigned_part_urls(
    *, object_key: str, s3_upload_id: str, parts: list[int]
) -> list[SignedPart]:
    s3 = _client()
    return [
        SignedPart(
            part_number=part_num,
            url=await s3.generate_presigned_url(
                "upload_part",
                Params={
                    "Bucket": settings.S3_BUCKET_NAME,
                    "Key": object_key,
                    "UploadId": s3_upload_id,
                    "PartNumber": part_num,
                },
                ExpiresIn=3600,
            ),
        )
        for part_num in parts
    ]


async def complete_s3_multipart_upload(
    *, object_key: str, s3_upload_id, parts: list[CompletedPart]
) -> None:
    await _client().complete_multipart_upload(
        Bucket=settings.S3_BUCKET_NAME,
        Key=object_key,
        UploadId=s3_upload_id,
        MultipartUpload={
            "Parts": [
                {"PartNumber": p.part_number, "ETag": p.etag}
                for p in sorted(parts, key=lambda p: p.part_number)
            ]
        },
    )
