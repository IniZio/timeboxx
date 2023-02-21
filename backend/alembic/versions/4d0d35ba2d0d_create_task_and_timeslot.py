"""'Create task and timeslot'

Revision ID: 4d0d35ba2d0d
Revises: 027fe07b03a5
Create Date: 2023-02-23 23:16:12.852279

"""
import sqlalchemy as sa

from alembic import op
from timeboxx.pkg.config import settings

# revision identifiers, used by Alembic.
revision = "4d0d35ba2d0d"
down_revision = "027fe07b03a5"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "task",
        sa.Column("title", sa.Text(), nullable=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("start_time", sa.DateTime(), nullable=True),
        sa.Column("end_time", sa.DateTime(), nullable=True),
        sa.Column("id", sa.Text(), nullable=False),
        sa.Column(
            "created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False
        ),
        sa.Column("client_id", sa.Text(), nullable=True),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_task")),
        sa.UniqueConstraint("client_id", name=op.f("uq_task_client_id")),
        schema=settings.DATABASE_SCHEMA,
    )
    op.create_table(
        "timeslot",
        sa.Column("task_id", sa.Text(), nullable=True),
        sa.Column("title", sa.Text(), nullable=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("start_time", sa.DateTime(), nullable=False),
        sa.Column("end_time", sa.DateTime(), nullable=True),
        sa.Column("id", sa.Text(), nullable=False),
        sa.Column(
            "created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False
        ),
        sa.Column("client_id", sa.Text(), nullable=True),
        sa.ForeignKeyConstraint(
            ["task_id"], ["timeboxx.task.id"], name=op.f("fk_timeslot_task_id_task")
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_timeslot")),
        sa.UniqueConstraint("client_id", name=op.f("uq_timeslot_client_id")),
        schema=settings.DATABASE_SCHEMA,
    )


def downgrade() -> None:
    op.drop_table("timeslot", schema=settings.DATABASE_SCHEMA)
    op.drop_table("task", schema=settings.DATABASE_SCHEMA)
