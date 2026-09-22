import uuid
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field
from sqlalchemy import UUID

from app.enums import UploadStatus, VideoStatus

VideoContentType = Literal[
    "video/mp4",
    "video/quicktime",
    "video/webm",
    "video/x-matroska",
    "application/x-matroska",
    "video/x-msvideo",
    "video/x-m4v",
]


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    sub: str


class UserBase(BaseModel):
    username: str = Field(min_length=1, max_length=50)
    email: EmailStr = Field(max_length=255)


class UserCreate(UserBase):
    password: str = Field(min_length=3, max_length=128)


class UserResponse(UserBase):

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    created_at: datetime


class ErrorResponse(BaseModel):
    detail: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=3, max_length=128)


class LoginResponse(BaseModel):
    user: UserResponse


class VideoUploadResponse(BaseModel):
    video_id: uuid.UUID
    upload_id: uuid.UUID
    status: UploadStatus


class VideoUploadRequest(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    filename: str = Field(min_length=1, max_length=500)
    content_type: VideoContentType
    size_bytes: int = Field(gt=0)
    collection_ids: list[uuid.UUID] = []


class CollectionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    description: str | None
    color_tag: str


class VideoResponse(BaseModel):
    id: uuid.UUID
    title: str
    original_filename: str
    content_type: str
    size_bytes: int | None
    status: VideoStatus
    created_at: datetime
    uploaded_at: datetime | None
    collection_names: list[str]


class SignedPart(BaseModel):
    part_number: int
    url: str


class SignPartsResponse(BaseModel):
    parts: list[SignedPart]


class SignPartsRequest(BaseModel):
    part_numbers: list[int] = Field(min_length=1)
