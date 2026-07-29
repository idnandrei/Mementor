from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError

from app.api.deps import SessionDep
from app.core.security import hash_password, verify_password
from app.models import User
from app.schemas import UserCreate


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
