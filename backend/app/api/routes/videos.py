import uuid

from fastapi import APIRouter, HTTPException, status

from app import repo
from app.api.deps import CurrentUser, SessionDep
from app.models import Video, VideoUpload
from app.repo import (
    create_video,
    create_video_upload,
    get_owned_collection_ids,
    link_video_collection,
)
from app.s3 import create_s3_multipart_upload, create_video_object_key
from app.schemas import VideoResponse, VideoUploadRequest, VideoUploadResponse

router = APIRouter(prefix="/videos", tags=["videos"])


@router.get(
    "/",
    response_model=list[VideoResponse],
    operation_id="getVideos",
)
async def get_videos(session: SessionDep, current_user: CurrentUser):
    return await repo.get_my_videos(session=session, owner_id=current_user.id)


@router.get(
    "/{video_id}",
    response_model=VideoResponse,
    operation_id="getVideo",
)
async def get_video(
    video_id: uuid.UUID,
    session: SessionDep,
    current_user: CurrentUser,
):
    video = await repo.get_my_video(
        session=session,
        owner_id=current_user.id,
        video_id=video_id,
    )
    if video is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Video not found"
        )
    return video


@router.post(
    "/upload",
    response_model=VideoUploadResponse,
    status_code=status.HTTP_201_CREATED,
    operation_id="uploadVideo",
)
async def initiate_upload(
    session: SessionDep, current_user: CurrentUser, video_file: VideoUploadRequest
):

    requested_ids = set(video_file.collection_ids)
    owned_ids = await get_owned_collection_ids(
        session=session,
        owner_id=current_user.id,
        collection_ids=requested_ids,
    )
    if requested_ids:
        if requested_ids != owned_ids:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="One or more selected collections don't exist",
            )

    video_id = uuid.uuid4()
    object_key = create_video_object_key(
        owner_id=current_user.id, video_id=video_id, filename=video_file.filename
    )
    s3_upload_id = await create_s3_multipart_upload(
        object_key=object_key,
        content_type=video_file.content_type,
    )

    video = await create_video(
        session=session,
        video_id=video_id,
        owner_id=current_user.id,
        video_in=video_file,
        object_key=object_key,
    )

    video_upload = await create_video_upload(
        session=session,
        video_id=video_id,
        s3_upload_id=s3_upload_id,
        object_key=object_key,
    )
    for collection_id in owned_ids:
        await link_video_collection(
            session=session, video_id=video.id, collection_id=collection_id
        )

    await session.commit()

    return VideoUploadResponse(
        video_id=video.id,
        upload_id=video_upload.id,
        status=video_upload.status,
    )
