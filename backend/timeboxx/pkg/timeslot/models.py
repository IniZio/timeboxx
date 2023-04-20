from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from timeboxx.pkg.db_models.timeslot import Timeslot


class CreateTimeslot(BaseModel):
    task_id: str
    title: Optional[str] = None


class UpdateTimeslot(BaseModel):
    id: str
    task_id: str
    title: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    duration: Optional[int] = None
    dirty_fields: Optional[list[str]] = None
    status: Optional[Timeslot.Status] = None
