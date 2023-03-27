from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class TimeboxTask(BaseModel):
    id: Optional[str] = None
    client_id: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None


class CreateTimebox(BaseModel):
    client_id: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    task: Optional[TimeboxTask] = None


class UpdateTimebox(BaseModel):
    id: Optional[str] = None
    client_id: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    task: Optional[TimeboxTask] = None
    dirty_fields: Optional[list[str]] = None
