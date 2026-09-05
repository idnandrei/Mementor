from collections.abc import AsyncGenerator
from typing import Annotated

import jwt
from fastapi import Cookie, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.status import HTTP_400_BAD_REQUEST

from app.core.config import settings
from app.core.db import engine
from app.models import User
from app.schemas import Token, TokenPayload

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/users/token")


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSession(engine, expire_on_commit=False) as session:
        yield session


SessionDep = Annotated[AsyncSession, Depends(get_db)]


async def get_auth_token(
    access_token: Annotated[
        str | None,
        Cookie(
            alias=settings.AUTH_COOKIE_NAME,
        ),
    ] = None,
) -> str:
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    return access_token


# For bearer token
# TokenDep = Annotated[str, Depends(oauth2_scheme)]
TokenDep = Annotated[str, Depends(get_auth_token)]


# for bearer token
async def get_current_user(session: SessionDep, token: TokenDep):
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY.get_secret_value(),
            algorithms=[settings.ALGORITHM],
        )
        token_data = TokenPayload(**payload)
    except (InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid or expired token"
        )

    user = await session.get(User, token_data.sub)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user"
        )

    return user


CurrentUser = Annotated[User, Depends(get_current_user)]


async def get_current_superuser(current_user: CurrentUser):
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="user does not have enough privileges",
        )
    return current_user
