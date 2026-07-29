from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm

from app import repo
from app.api.deps import SessionDep
from app.core.config import settings
from app.core.security import create_access_token
from app.schemas import ErrorResponse, LoginRequest, LoginResponse, Token, UserResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post(
    "/login",
    response_model=LoginResponse,
    operation_id="login",
    responses={
        401: {
            "model": ErrorResponse,
            "description": "Invalid credentials",
        },
    },
)
async def login(
    login_in: LoginRequest,
    response: Response,
    session: SessionDep,
) -> LoginResponse:
    user = await repo.authenticate(
        session=session,
        email=login_in.email,
        password=login_in.password,
    )

    if user is None or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    max_age = settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    token = create_access_token(
        user.id,
        expires_delta=timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES,
        ),
    )

    response.set_cookie(
        key=settings.AUTH_COOKIE_NAME,
        value=token,
        max_age=max_age,
        httponly=True,
        secure=settings.AUTH_COOKIE_SECURE,
        samesite=settings.AUTH_COOKIE_SAMESITE,
        domain=settings.AUTH_COOKIE_DOMAIN,
        path="/",
    )

    return LoginResponse(
        user=UserResponse.model_validate(user),
    )


@router.post(
    "/logout",
    status_code=status.HTTP_204_NO_CONTENT,
    operation_id="logout",
)
async def logout(response: Response) -> None:
    response.delete_cookie(
        key=settings.AUTH_COOKIE_NAME,
        domain=settings.AUTH_COOKIE_DOMAIN,
        path="/",
        secure=settings.AUTH_COOKIE_SECURE,
        httponly=True,
        samesite=settings.AUTH_COOKIE_SAMESITE,
    )


@router.post(
    "/token",
    response_model=Token,
    operation_id="createAccessToken",
    responses={
        400: {
            "model": ErrorResponse,
            "description": "User is inactive",
        },
        404: {
            "model": ErrorResponse,
            "description": "Invalid credentials",
        },
    },
)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDep
) -> Token:
    user = await repo.authenticate(
        session=session, email=form_data.username, password=form_data.password
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect email or password"
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="user is inactive"
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(
        access_token=create_access_token(user.id, expires_delta=access_token_expires)
    )
