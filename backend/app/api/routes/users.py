import uuid
from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError

from app import repo
from app.api.deps import CurrentUser, SessionDep
from app.core.config import settings
from app.core.security import create_access_token
from app.schemas import ErrorResponse, Token, UserCreate, UserResponse

router = APIRouter(prefix="/users", tags=["users"])


@router.get(
    "/",
    response_model=list[UserResponse],
    status_code=status.HTTP_200_OK,
    operation_id="listUsers",
)
async def get_users(session: SessionDep):
    return await repo.get_all_users(session=session)


@router.get(
    "/me",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
    operation_id="getCurrentUser",
    responses={
        400: {
            "model": ErrorResponse,
            "description": "Inactive user",
        },
        401: {
            "model": ErrorResponse,
            "description": "Not authenticated",
        },
        403: {
            "model": ErrorResponse,
            "description": "Invalid or expired token",
        },
        404: {
            "model": ErrorResponse,
            "description": "User not found",
        },
    },
)
async def read_user_me(current_user: CurrentUser):
    return current_user


@router.get(
    "/{user_id}",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
    operation_id="getUser",
)
async def get_user(session: SessionDep, user_id: uuid.UUID):
    return await repo.get_user_by_id(session=session, user_id=user_id)


@router.post(
    "/",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    operation_id="registerUser",
    responses={
        409: {
            "model": ErrorResponse,
            "description": "Email or username already exists",
        },
    },
)
async def create_user(
    user_in: UserCreate,
    session: SessionDep,
):
    existing_email = await repo.get_user_by_email(
        session=session,
        user_email=user_in.email,
    )

    if existing_email is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already exists",
        )

    existing_username = await repo.get_user_by_username(
        session=session,
        username=user_in.username,
    )

    if existing_username is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already exists",
        )

    try:
        return await repo.create_user(
            session=session,
            user_in=user_in,
        )
    except IntegrityError:
        await session.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email or username already exists",
        ) from None
