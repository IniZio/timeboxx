"""'Add task status'

Revision ID: d703ce866fb3
Revises: 23e8468aaba3
Create Date: 2023-03-13 23:59:04.626813

"""
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op
from timeboxx.pkg.config import AlembicSettings

# revision identifiers, used by Alembic.
revision = "d703ce866fb3"
down_revision = "23e8468aaba3"
branch_labels = None
depends_on = None

settings = AlembicSettings.from_env()


def upgrade() -> None:
    task_status = postgresql.ENUM(
        "BACKLOG", "TODO", "IN_PROGRESS", "DONE", "CANCELLED", name="task_status"
    )
    task_status.create(op.get_bind())

    op.add_column(
        "task",
        sa.Column("status", task_status, nullable=True),
        schema=settings.DATABASE_SCHEMA,
    )


def downgrade() -> None:
    op.drop_column("task", "status", schema=settings.DATABASE_SCHEMA)
    op.execute("DROP TYPE task_status")
