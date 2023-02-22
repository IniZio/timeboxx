from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from timeboxx.pkg.db_models.base import Base
from timeboxx.pkg.db_models.mixins import AuditableMixin, IDMixin, OfflineMixin

if TYPE_CHECKING:
    from timeboxx.pkg.db_models.timeslot import Timeslot


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

    timeslots: Mapped[list[Timeslot]] = relationship(back_populates="task")
