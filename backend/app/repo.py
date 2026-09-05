from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError

from app.api.deps import SessionDep
from app.core.security import hash_password, verify_password
from app.enums import UploadStatus
from app.models import Collection, CollectionVideo, User, Video, VideoUpload
from app.schemas import UserCreate, VideoUploadRequest


async def get_all_users(*, session: SessionDep):
    stmt = select(User)
    users = (await session.scalars(stmt)).all()
    return users


async def get_user_by_id(*, session: SessionDep, user_id: UUID):
    user = await session.get(User, user_id)
    return user


async def get_user_by_email(*, session: SessionDep, user_email: str) -> User | None:
    stmt = select(User).where(User.email == user_email.lower())
    user = (await session.scalars(stmt)).one_or_none()
    return user


async def get_user_by_username(
    *,
    session: SessionDep,
    username: str,
) -> User | None:
    stmt = select(User).where(func.lower(User.username) == username.lower())

    return (await session.scalars(stmt)).one_or_none()


async def create_user(
    *,
    session: SessionDep,
    user_in: UserCreate,
) -> User:
    user = User(
        username=user_in.username,
        email=str(user_in.email).lower(),
        hashed_password=hash_password(user_in.password),
    )

    session.add(user)
    await session.commit()
    await session.refresh(user)

    return user


# Dummy hash to use for timing attack prevention when user is not found
# This is an Argon2 hash of a random password, used to ensure constant-time comparison
DUMMY_HASH = "$argon2id$v=19$m=65536,t=3,p=4$MjQyZWE1MzBjYjJlZTI0Yw$YTU4NGM5ZTZmYjE2NzZlZjY0ZWY3ZGRkY2U2OWFjNjk"


async def authenticate(*, session: SessionDep, email: str, password: str):
    db_user = await get_user_by_email(session=session, user_email=email)
    if not db_user:
        verify_password(password, DUMMY_HASH)
        return None
    verified, updated_password_hash = verify_password(password, db_user.hashed_password)

    if not verified:
        return None
    if updated_password_hash:
        db_user.hashed_password = updated_password_hash
        session.add(db_user)
        await session.commit()
        await session.refresh(db_user)

    return db_user


# DOESNT COMMIT
async def create_video(
    *,
    session: SessionDep,
    video_id: UUID,
    owner_id: UUID,
    video_in: VideoUploadRequest,
    object_key: str,
) -> Video:
    video = Video(
        id=video_id,
        owner_id=owner_id,
        title=video_in.title,
        original_filename=video_in.filename,
        object_key=object_key,
        content_type=video_in.content_type,
    )

    session.add(video)
    await session.flush()

    return video


# DOESNT COMMIT
async def create_video_upload(
    *,
    session: SessionDep,
    video_id: UUID,
    s3_upload_id: str,
    object_key: str,
) -> VideoUpload:
    video_upload = VideoUpload(
        video_id=video_id,
        s3_upload_id=s3_upload_id,
        object_key=object_key,
        status=UploadStatus.INITIATED,
    )

    session.add(video_upload)
    await session.flush()

    return video_upload


async def get_owned_collection_ids(
    *, session: SessionDep, owner_id: UUID, collection_ids: set[UUID]
) -> set[UUID]:
    stmt = select(Collection.id).where(
        Collection.owner_id == owner_id, Collection.id.in_(collection_ids)
    )
    collections = await session.scalars(stmt)

    return set(collections.all())


async def link_video_collection(
    *, session: SessionDep, video_id: UUID, collection_id: UUID
):
    collection_video = CollectionVideo(
        collection_id=collection_id,
        video_id=video_id,
    )
    session.add(collection_video)
    await session.flush()
    return collection_video


async def get_my_collections(*, session: SessionDep, owner_id: UUID):

    stmt = select(Collection).where(Collection.owner_id == owner_id)
    collections = (await session.scalars(stmt)).all()
    return collections


async def get_my_videos(
    *,
    session: SessionDep,
    owner_id: UUID,
    collection_id: UUID | None = None,
):
    stmt = (
        select(Video)
        .where(Video.owner_id == owner_id)
        .order_by(Video.created_at.desc())
    )

    if collection_id is not None:
        stmt = stmt.join(
            CollectionVideo,
            (CollectionVideo.video_id == Video.id)
            & (CollectionVideo.collection_id == collection_id),
        )

    videos = (await session.scalars(stmt)).all()
    if not videos:
        return []

    names_stmt = (
        select(CollectionVideo.video_id, Collection.name)
        .join(Collection, Collection.id == CollectionVideo.collection_id)
        .where(CollectionVideo.video_id.in_([video.id for video in videos]))
        .order_by(Collection.name)
    )
    names_by_video: dict[UUID, list[str]] = {video.id: [] for video in videos}
    for video_id, name in (await session.execute(names_stmt)).all():
        names_by_video[video_id].append(name)

    return [
        {
            "id": video.id,
            "title": video.title,
            "original_filename": video.original_filename,
            "content_type": video.content_type,
            "size_bytes": video.size_bytes,
            "status": video.status,
            "created_at": video.created_at,
            "uploaded_at": video.uploaded_at,
            "collection_names": names_by_video[video.id],
        }
        for video in videos
    ]


async def get_my_video(*, session: SessionDep, owner_id: UUID, video_id: UUID):
    videos = await get_my_videos(session=session, owner_id=owner_id)
    return next((video for video in videos if video["id"] == video_id), None)
