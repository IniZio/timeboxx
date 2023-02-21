from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from timeboxx.pkg.config import settings
from timeboxx.pkg.db_models.base import Base
from timeboxx.pkg.db_models.mixins import AuditableMixin, IDMixin

if TYPE_CHECKING:
    from timeboxx.pkg.db_models import Task


class Timeslot(Base, IDMixin, AuditableMixin):
    __tablename__ = "timeslot"

    task_id: Mapped[int] = mapped_column(
        ForeignKey(f"{settings.DATABASE_SCHEMA}.task.id"), nullable=True
    )
    task: Mapped[Task] = relationship(back_populates="timeslots")

    title: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    start_time: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
    )

    end_time: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
    )
