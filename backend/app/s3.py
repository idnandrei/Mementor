import asyncio
from pathlib import Path
from uuid import UUID

import boto3

from app.core.config import settings
from app.schemas import SignedPart

ALLOWED_VIDEO_EXTENSIONS = {
    ".mp4",
    ".mov",
    ".webm",
    ".mkv",
    ".avi",
    ".m4v",
}


s3_client = boto3.client(
    "s3",
    region_name=settings.S3_AWS_REGION,
)


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
    response = await asyncio.to_thread(
        s3_client.create_multipart_upload,
        Bucket=settings.S3_BUCKET_NAME,
        Key=object_key,
        ContentType=content_type,
    )

    return response["UploadId"]


async def create_presigned_part_urls(
    *, object_key: str, s3_upload_id: str, parts: list[int]
) -> list[SignedPart]:
    def _sign(part_num: int) -> SignedPart:
        url = s3_client.generate_presigned_url(
            "upload_part",
            Params={
                "Bucket": settings.S3_BUCKET_NAME,
                "Key": object_key,
                "UploadId": s3_upload_id,
                "PartNumber": part_num,
            },
            ExpiresIn=3600,
        )
        return SignedPart(part_number=part_num, url=url)

    return await asyncio.to_thread(lambda: [_sign(num) for num in parts])
