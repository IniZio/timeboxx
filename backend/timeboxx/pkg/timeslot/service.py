from datetime import datetime
from typing import Optional

from sqlalchemy.orm import Session

from timeboxx.pkg.db_models.timeslot import Timeslot, TimeslotStatus


class TimeslotService:
    def __init__(self, session: Session) -> None:
        self.session = session

    def create_timeslot(
        self, task_id: str, user_id: Optional[str] = None, title: Optional[str] = None
    ):
        timeslot = Timeslot(
            id=Timeslot.id_factory(),
            task_id=task_id,
            created_by_id=user_id,
            updated_by_id=user_id,
            title=title,
            start_time=datetime.utcnow(),
            duration=0,
            status=TimeslotStatus.STARTED.value,
        )

        self.session.add(timeslot)
        return timeslot

    def update_timeslot(
        self,
        id: str,
        task_id: str,
        title: Optional[str] = None,
        user_id: Optional[str] = None,
        status: Optional[TimeslotStatus] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
        duration: Optional[int] = None,
        dirty_fields: Optional[list[str]] = None,
    ):
        timeslot = self.session.get(Timeslot, id)

        if not timeslot:
            return None

        if not dirty_fields or "title" in dirty_fields:
            timeslot.title = title or ""

        if not dirty_fields or "status" in dirty_fields:
            timeslot.status = status.value if status else None

        if not dirty_fields or "start_time" in dirty_fields:
            if start_time:
                timeslot.start_time = start_time

        if not dirty_fields or "end_time" in dirty_fields:
            timeslot.end_time = end_time

        if not dirty_fields or "duration" in dirty_fields:
            timeslot.duration = duration or 0

        if not dirty_fields or "task_id" in dirty_fields:
            timeslot.task_id = task_id

        if user_id:
            timeslot.updated_by_id = user_id

        return timeslot
