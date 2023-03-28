"""'Add missing cascade to foreign keys'

Revision ID: 33d5ff6f3a8f
Revises: d703ce866fb3
Create Date: 2023-03-27 09:54:24.053177

"""

from alembic import op
from timeboxx.pkg.config import AlembicSettings

# revision identifiers, used by Alembic.
revision = "33d5ff6f3a8f"
down_revision = "d703ce866fb3"
branch_labels = None
depends_on = None

settings = AlembicSettings.from_env()


def upgrade() -> None:
    op.drop_constraint(
        "fk_timebox_task_id_task",
        "timebox",
        schema=settings.DATABASE_SCHEMA,
        type_="foreignkey",
    )
    op.create_foreign_key(
        op.f("fk_timebox_task_id_task"),
        "timebox",
        "task",
        ["task_id"],
        ["id"],
        source_schema=settings.DATABASE_SCHEMA,
        referent_schema=settings.DATABASE_SCHEMA,
        ondelete="CASCADE",
    )
    op.drop_constraint(
        "fk_timeslot_task_id_task",
        "timeslot",
        schema=settings.DATABASE_SCHEMA,
        type_="foreignkey",
    )
    op.drop_constraint(
        "fk_timeslot_timebox_id_timebox",
        "timeslot",
        schema=settings.DATABASE_SCHEMA,
        type_="foreignkey",
    )
    op.create_foreign_key(
        op.f("fk_timeslot_task_id_task"),
        "timeslot",
        "task",
        ["task_id"],
        ["id"],
        source_schema=settings.DATABASE_SCHEMA,
        referent_schema=settings.DATABASE_SCHEMA,
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        op.f("fk_timeslot_timebox_id_timebox"),
        "timeslot",
        "timebox",
        ["timebox_id"],
        ["id"],
        source_schema=settings.DATABASE_SCHEMA,
        referent_schema=settings.DATABASE_SCHEMA,
        ondelete="CASCADE",
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
        "fk_timeslot_timebox_id_timebox",
        "timeslot",
        "timebox",
        ["timebox_id"],
        ["id"],
        source_schema=settings.DATABASE_SCHEMA,
        referent_schema=settings.DATABASE_SCHEMA,
    )
    op.create_foreign_key(
        "fk_timeslot_task_id_task",
        "timeslot",
        "task",
        ["task_id"],
        ["id"],
        source_schema=settings.DATABASE_SCHEMA,
        referent_schema=settings.DATABASE_SCHEMA,
    )
    op.drop_constraint(
        op.f("fk_timebox_task_id_task"),
        "timebox",
        schema=settings.DATABASE_SCHEMA,
        type_="foreignkey",
    )
    op.create_foreign_key(
        "fk_timebox_task_id_task",
        "timebox",
        "task",
        ["task_id"],
        ["id"],
        source_schema=settings.DATABASE_SCHEMA,
        referent_schema=settings.DATABASE_SCHEMA,
    )
