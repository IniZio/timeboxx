"""'Create timebox'

Revision ID: 03d3bea9bf2e
Revises: 4d0d35ba2d0d
Create Date: 2023-02-26 11:52:51.833665

"""
import sqlalchemy as sa

from alembic import op
from timeboxx.pkg.config import settings

# revision identifiers, used by Alembic.
revision = "03d3bea9bf2e"
down_revision = "4d0d35ba2d0d"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "timebox",
        sa.Column("task_id", sa.Text(), nullable=True),
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
        sa.ForeignKeyConstraint(
            ["task_id"], ["timeboxx.task.id"], name=op.f("fk_timebox_task_id_task")
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_timebox")),
        sa.UniqueConstraint("client_id", name=op.f("uq_timebox_client_id")),
        schema=settings.DATABASE_SCHEMA,
    )
    op.add_column("timeslot", sa.Column("timebox_id", sa.Text(), nullable=True))
    op.drop_constraint("fk_timeslot_task_id_task", "timeslot", type_="foreignkey")
    op.create_foreign_key(
        op.f("fk_timeslot_task_id_task"),
        "timeslot",
        "task",
        ["task_id"],
        ["id"],
        source_schema=settings.DATABASE_SCHEMA,
        referent_schema=settings.DATABASE_SCHEMA,
    )
    op.create_foreign_key(
        op.f("fk_timeslot_timebox_id_timebox"),
        "timeslot",
        "timebox",
        ["timebox_id"],
        ["id"],
        source_schema=settings.DATABASE_SCHEMA,
        referent_schema=settings.DATABASE_SCHEMA,
    )


def downgrade() -> None:
    op.drop_constraint(
        op.f("fk_timeslot_timebox_id_timebox"),
        "timeslot",
        schema=settings.DATABASE_SCHEMA,
        type_="foreignkey",
    )
    op.drop_constraint(
        op.f("fk_timeslot_task_id_task"),
        "timeslot",
        schema=settings.DATABASE_SCHEMA,
        type_="foreignkey",
    )
    op.create_foreign_key(
        "fk_timeslot_task_id_task", "timeslot", "task", ["task_id"], ["id"]
    )
    op.drop_column("timeslot", "timebox_id")
    op.drop_table("timebox", schema=settings.DATABASE_SCHEMA)
