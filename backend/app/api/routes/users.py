import uuid

from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select

from app import repo
from app.api.deps import SessionDep
from app.models import User
from app.schemas import UserCreate, UserResponse

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/", response_model=list[UserResponse], status_code=status.HTTP_200_OK)
async def get_users(session: SessionDep):
    return await repo.get_all_users(session=session)


@router.get("/{user_id}", response_model=UserResponse, status_code=status.HTTP_200_OK)
async def get_user(session: SessionDep, user_id: uuid.UUID):
    return await repo.get_user_by_id(session=session, user_id=user_id)


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(user_in: UserCreate, session: SessionDep):
    return await repo.create_user(session=session, user_in=user_in)
