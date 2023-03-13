from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING, Optional

from sqlalchemy import DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from timeboxx.pkg.db_models.base import Base
from timeboxx.pkg.db_models.mixins import AuditableMixin, IDMixin, OfflineMixin

if TYPE_CHECKING:
    from timeboxx.pkg.db_models.timebox import Timebox
    from timeboxx.pkg.db_models.timeslot import Timeslot


class TaskStatus(Enum):
    BACKLOG = "BACKLOG"
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"
    CANCELLED = "CANCELLED"


class Task(Base, IDMixin, AuditableMixin, OfflineMixin):
    __tablename__ = "task"

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
        nullable=True,
    )

    end_time: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=True,
    )

    timeboxes: Mapped[list[Timebox]] = relationship(back_populates="task")
    timeslots: Mapped[list[Timeslot]] = relationship(back_populates="task")

    status: Mapped[Optional[TaskStatus]]
