from datetime import UTC, datetime, timedelta
from typing import Tuple
from uuid import UUID

import jwt
from pwdlib import PasswordHash

from app.core.config import settings

password_hash = PasswordHash.recommended()


def hash_password(plain_pass: str) -> str:
    return password_hash.hash(plain_pass)


def verify_password(
    plain_password: str, hashed_password: str
) -> Tuple[bool, str | None]:
    return password_hash.verify_and_update(plain_password, hashed_password)


def create_access_token(subject: UUID, expires_delta: timedelta | None = None) -> str:
    """Create a JWT access token."""
    if expires_delta is None:
        expires_delta = timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES,
        )

    expire = datetime.now(UTC) + expires_delta

    to_encode = {
        "exp": expire,
        "sub": str(subject),
    }
    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY.get_secret_value(),
        algorithm=settings.ALGORITHM,
    )
    return encoded_jwt


def verify_access_token(token: str) -> str | None:
    """Verify a JWTY access token and return the subject (user id) if valid"""
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY.get_secret_value(),
            algorithms=[settings.ALGORITHM],
            options={"require": ["exp", "sub"]},
        )
    except jwt.InvalidTokenError:
        return None
    else:
        return payload.get("sub")
