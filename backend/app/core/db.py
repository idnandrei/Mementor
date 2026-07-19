from collections.abc import AsyncGenerator

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings
from app.core.security import hash_password

engine = create_async_engine(settings.DATABASE_URL)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSession(engine, expire_on_commit=False) as session:
        yield session


async def create_first_superuser(session: AsyncSession) -> None:
    from app.models import User

    stmt = select(User).where(User.email == settings.FIRST_SUPERUSER_EMAIL)
    existing_user = await session.scalar(stmt)

    if existing_user:
        return

    superuser = User(
        username=settings.FIRST_SUPERUSER_USERNAME,
        email=str(settings.FIRST_SUPERUSER_EMAIL).lower(),
        hashed_password=hash_password(settings.FIRST_SUPERUSER_PASSWORD),
        is_superuser=True,
    )

    session.add(superuser)
    await session.commit()


async def init_db(session: AsyncSession) -> None:
    await create_first_superuser(session)
