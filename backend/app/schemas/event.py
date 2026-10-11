from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class EventCreate(BaseModel):
    title: str
    description: str
    date_time: datetime
    venue: str
    capacity: int
    category: str
    image_url: Optional[str] = None


class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date_time: Optional[datetime] = None
    venue: Optional[str] = None
    capacity: Optional[int] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None


class EventResponse(BaseModel):
    id: int
    title: str
    description: str
    date_time: datetime
    venue: str
    capacity: int
    category: str
    image_url: Optional[str]
    is_active: bool
    created_by: int
    created_at: datetime
    registered_count: int
    is_full: bool

    class Config:
        from_attributes = True


class RegistrationResponse(BaseModel):
    id: int
    user_id: int
    event_id: int
    is_active: bool
    qr_code: Optional[str]
    registered_at: datetime

    class Config:
        from_attributes = True
