import uuid

from fastapi import APIRouter, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.sql.functions import user

from app.api.deps import SessionDep
from app.models import User
from app.schemas import UserCreate, UserResponse

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/", response_model=list[UserResponse], status_code=status.HTTP_200_OK)
def get_users(session: SessionDep):
    query = select(User)
    users = session.scalars(query).all()

    return users


@router.get("/{user_id}", response_model=UserResponse, status_code=status.HTTP_200_OK)
def get_user(session: SessionDep, user_id: uuid.UUID):
    user = session.scalar(select(User).where(User.id == user_id))
    if user:
        return user

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user_in: UserCreate, session: SessionDep):

    existing = session.scalars(
        select(User).where(User.email == user_in.email)
    ).one_or_none()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="The user email already exists",
        )

    db_obj = User(
        username=user_in.username,
        hashed_password=user_in.password,
        email=str(user_in.email),
    )

    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)

    return db_obj
