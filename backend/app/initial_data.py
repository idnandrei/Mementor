import asyncio
import logging

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.db import engine
from app.core.security import hash_password
from app.models import User

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def create_first_superuser(session: AsyncSession) -> None:
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


async def init_db() -> None:
    async with AsyncSession(engine) as session:
        await create_first_superuser(session)


async def main() -> None:
    logger.info("Creating initial data")
    await init_db()
    logger.info("Initial data created")


if __name__ == "__main__":
    asyncio.run(main())
