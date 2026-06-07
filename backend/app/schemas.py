import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserBase(BaseModel):
    username: str = Field(min_length=1, max_length=50)
    email: EmailStr = Field(max_length=255)


class UserCreate(UserBase):
    password: str = Field(min_length=3, max_length=128)


class UserResponse(UserBase):

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    created_at: datetime
