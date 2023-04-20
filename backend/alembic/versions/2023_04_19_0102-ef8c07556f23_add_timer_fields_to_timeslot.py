"""Add timer fields to timeslot

Revision ID: ef8c07556f23
Revises: 8ae4327ab94f
Create Date: 2023-04-19 01:02:58.825151

"""
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op
from timeboxx.pkg.config import AlembicSettings

# revision identifiers, used by Alembic.
revision = "ef8c07556f23"
down_revision = "8ae4327ab94f"
branch_labels = None
depends_on = None

settings = AlembicSettings.from_env()


def upgrade() -> None:
    timeslot_status = postgresql.ENUM(
        "STARTED", "PAUSED", "STOPPED", name="timeslot_status"
    )
    timeslot_status.create(op.get_bind())

    op.add_column(
        "timeslot",
        sa.Column("status", timeslot_status, nullable=True),
        schema=settings.DATABASE_SCHEMA,
    )
    op.add_column(
        "timeslot",
        sa.Column("duration", sa.Integer, nullable=True),
        schema=settings.DATABASE_SCHEMA,
    )


def downgrade() -> None:
    op.drop_column("timeslot", "duration", schema=settings.DATABASE_SCHEMA)
    op.drop_column("timeslot", "status", schema=settings.DATABASE_SCHEMA)
    op.execute("DROP TYPE timeslot_status")
