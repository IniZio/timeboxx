from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Text
from sqlalchemy import event as sa_event
from sqlalchemy import func as sa_func
from sqlalchemy.orm import Mapped, declarative_mixin, declared_attr, mapped_column
from ulid import ulid

from timeboxx.pkg.config import settings


@declarative_mixin
class IDMixin:
    @classmethod
    def get_id_prefix(cls) -> str:
        prefix: str = cls.__name__.lower()
        return prefix

    @classmethod
    def id_factory(cls) -> str:
        prefix = cls.get_id_prefix()
        return f"{prefix}_{ulid()}"

    @declared_attr
    def id(cls) -> Mapped[str]:
        return mapped_column(
            Text,
            primary_key=True,
            default=lambda: cls.id_factory(),
        )


@declarative_mixin
class OfflineMixin:
    @declared_attr
    def client_id(cls) -> Mapped[str]:
        return mapped_column(Text, unique=True, nullable=True)


@declarative_mixin
class AuditableMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        server_default=sa_func.now(),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        server_default=sa_func.now(),
    )

    created_by_id: Mapped[int] = mapped_column(
        ForeignKey(f"{settings.DATABASE_SCHEMA}.user.id"), nullable=True
    )

    updated_by_id: Mapped[int] = mapped_column(
        ForeignKey(f"{settings.DATABASE_SCHEMA}.user.id"), nullable=True
    )

    @staticmethod
    def update_time(mapper, connection, instance):
        now = datetime.utcnow()
        instance.updated_at = now

    @classmethod
    def register(cls):
        sa_event.listen(
            AuditableMixin, "before_update", cls.update_time, propagate=True
        )
