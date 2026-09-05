import asyncio
from pathlib import Path
from uuid import UUID

import boto3

from app.core.config import settings

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
