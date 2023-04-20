from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING, Optional

from sqlalchemy import DateTime, ForeignKey, Text
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import Mapped, mapped_column, relationship

from timeboxx.pkg.db_models.base import Base
from timeboxx.pkg.db_models.mixins import AuditableMixin, IDMixin, OfflineMixin

if TYPE_CHECKING:
    from timeboxx.pkg.db_models import Task
    from timeboxx.pkg.db_models.timebox import Timebox


class TimeslotStatus(Enum):
    STARTED = "STARTED"
    PAUSED = "PAUSED"
    STOPPED = "STOPPED"


class Timeslot(Base, IDMixin, AuditableMixin, OfflineMixin):
    __tablename__ = "timeslot"

    Status = TimeslotStatus

    task_id: Mapped[str] = mapped_column(
        ForeignKey("task.id", ondelete="CASCADE"), nullable=True
    )
    task: Mapped[Task] = relationship(back_populates="timeslots", lazy=False)

    timebox_id: Mapped[str] = mapped_column(
        ForeignKey("timebox.id", ondelete="CASCADE"), nullable=True
    )
    timebox: Mapped[Timebox] = relationship(back_populates="timeslots", lazy=False)

    title: Mapped[str] = mapped_column(
        Text,
        nullable=True,
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=True,
    )

    start_time: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
    )

    end_time: Mapped[Optional[datetime]] = mapped_column(
        DateTime,
        nullable=True,
    )

    duration: Mapped[int] = mapped_column(nullable=True)

    status: Mapped[Optional[TimeslotStatus]] = mapped_column(
        postgresql.ENUM(TimeslotStatus, name="timeslot_status")
    )
