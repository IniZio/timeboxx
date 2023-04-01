"""Add deadline to task

Revision ID: 8ae4327ab94f
Revises: 33d5ff6f3a8f
Create Date: 2023-04-01 11:17:18.478699

"""
import sqlalchemy as sa

from alembic import op
from timeboxx.pkg.config import AlembicSettings

# revision identifiers, used by Alembic.
revision = "8ae4327ab94f"
down_revision = "33d5ff6f3a8f"
branch_labels = None
depends_on = None

settings = AlembicSettings.from_env()


def upgrade() -> None:
    op.add_column(
        "task",
        sa.Column("deadline", sa.DateTime(), nullable=True),
        schema=settings.DATABASE_SCHEMA,
    )


def downgrade() -> None:
    op.drop_column("task", "deadline", schema=settings.DATABASE_SCHEMA)
