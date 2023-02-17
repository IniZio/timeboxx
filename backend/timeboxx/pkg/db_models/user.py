from .base import Base
from .mixins import AuditableMixin, IDMixin


class User(Base, IDMixin, AuditableMixin):
    __tablename__ = "user"
