from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import select

from app.api.deps import SessionDep
from app.models import User
from app.schemas import UserCreate


async def get_all_users(*, session: SessionDep):
    stmt = select(User)
    users = (await session.scalars(stmt)).all()
    return users


async def get_user_by_id(*, session: SessionDep, user_id: UUID):
    user = await session.get(User, user_id)
    print(user)
    if user:
        return user

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)


async def create_user(*, session: SessionDep, user_in: UserCreate):
    stmt = select(User).where(User.email == user_in.email)
    existing = (await session.scalars(stmt)).one_or_none()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email already exists"
        )

    db_obj = User(
        username=user_in.username,
        hashed_password=user_in.password,
        email=str(user_in.email),
    )

    session.add(db_obj)
    await session.commit()
    await session.refresh(db_obj)

    return db_obj
