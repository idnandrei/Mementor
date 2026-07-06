import uuid
from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app import repo
from app.api.deps import CurrentUser, SessionDep
from app.core.config import settings
from app.core.security import create_access_token
from app.schemas import Token, UserCreate, UserResponse

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/", response_model=list[UserResponse], status_code=status.HTTP_200_OK)
async def get_users(session: SessionDep):
    return await repo.get_all_users(session=session)


@router.get("/me", response_model=UserResponse, status_code=status.HTTP_200_OK)
async def read_user_me(current_user: CurrentUser):
    return current_user


@router.get("/{user_id}", response_model=UserResponse, status_code=status.HTTP_200_OK)
async def get_user(session: SessionDep, user_id: uuid.UUID):
    return await repo.get_user_by_id(session=session, user_id=user_id)


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(user_in: UserCreate, session: SessionDep):
    user = repo.get_user_by_email(session=session, user_email=user_in.email)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email already exists"
        )
    return await repo.create_user(session=session, user_in=user_in)


@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDep
) -> Token:
    user = await repo.authenticate(
        session=session, email=form_data.username, password=form_data.password
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect email of password"
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="user is inactive"
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(
        access_token=create_access_token(user.id, expires_delta=access_token_expires)
    )
