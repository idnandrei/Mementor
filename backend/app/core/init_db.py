from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.db import Base, engine
from app.models import User


def create_first_superuser(session: Session) -> None:
    query = select(User).where(User.email == settings.FIRST_SUPERUSER_EMAIL)
    existing_user = session.scalar(query)

    if existing_user:
        return

    superuser = User(
        username=settings.FIRST_SUPERUSER_USERNAME,
        email=str(settings.FIRST_SUPERUSER_EMAIL),
        hashed_password=settings.FIRST_SUPERUSER_PASSWORD,
        is_superuser=True,
    )

    session.add(superuser)
    session.commit()


def init_db() -> None:

    with Session(engine) as session:
        create_first_superuser(session)
