from boto3 import session
import uuid

from fastapi import APIRouter, HTTPException, status

from app import repo
from app.api.deps import CurrentUser, SessionDep
from app.models import Collection
from app.schemas import CollectionResponse, VideoResponse

router = APIRouter(prefix="/collections", tags=["collections"])


@router.get(
    "/",
    response_model=list[CollectionResponse],
    status_code=status.HTTP_200_OK,
    operation_id="getCollections",
)
async def get_collections(session: SessionDep, current_user: CurrentUser):
    return await repo.get_my_collections(session=session, owner_id=current_user.id)


@router.get(
    "/{collection_id}/videos",
    response_model=list[VideoResponse],
    operation_id="getCollectionVideos",
)
async def get_collection_videos(
    collection_id: uuid.UUID,
    session: SessionDep,
    current_user: CurrentUser,
):
    collection = await session.get(Collection, collection_id)
    if collection is None or collection.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Collection not found",
        )
    return await repo.get_my_videos(
        session=session,
        owner_id=current_user.id,
        collection_id=collection_id,
    )
