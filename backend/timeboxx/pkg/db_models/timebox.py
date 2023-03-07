from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from timeboxx.pkg.config import settings
from timeboxx.pkg.db_models.base import Base
from timeboxx.pkg.db_models.mixins import AuditableMixin, IDMixin, OfflineMixin
from timeboxx.pkg.db_models.task import Task

if TYPE_CHECKING:
    from timeboxx.pkg.db_models.timeslot import Timeslot


class Timebox(Base, IDMixin, AuditableMixin, OfflineMixin):
    __tablename__ = "timebox"

    task_id: Mapped[int] = mapped_column(
        ForeignKey(f"{settings.DATABASE_SCHEMA}.task.id"), nullable=True
    )
    task: Mapped[Task] = relationship(back_populates="timeboxes", lazy=False)

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

    timeslots: Mapped[list[Timeslot]] = relationship(back_populates="timebox")
