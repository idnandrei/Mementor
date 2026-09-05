# app/enums.py

import enum


class VideoStatus(str, enum.Enum):
    PENDING_UPLOAD = "pending_upload"
    UPLOADED = "uploaded"
    FAILED = "failed"


class UploadStatus(str, enum.Enum):
    INITIATED = "initiated"
    COMPLETED = "completed"
    ABORTED = "aborted"
    FAILED = "failed"
