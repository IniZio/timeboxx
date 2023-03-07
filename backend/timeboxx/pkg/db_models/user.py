from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import AuditableMixin, IDMixin


class User(Base, IDMixin, AuditableMixin):
    __tablename__ = "user"

    authgear_id: Mapped[str] = mapped_column(
        Text,
        unique=True,
    )
    name: Mapped[str] = mapped_column(Text, nullable=True)
    email: Mapped[str] = mapped_column(Text, nullable=True)
