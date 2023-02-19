"""Init

Revision ID: 385bda55521a
Revises:
Create Date: 2023-02-18 10:47:12.768749

"""
import sqlalchemy as sa

from alembic import op
from timeboxx.pkg.config import settings

# revision identifiers, used by Alembic.
revision = "385bda55521a"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute(sa.text(f"CREATE SCHEMA IF NOT EXISTS {settings.DATABASE_SCHEMA}"))


def downgrade() -> None:
    op.execute(sa.text(f"CREATE SCHEMA IF NOT EXISTS {settings.DATABASE_SCHEMA}"))
