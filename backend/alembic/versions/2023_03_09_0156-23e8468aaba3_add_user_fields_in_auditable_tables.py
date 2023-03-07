"""'Add user fields in auditable tables'

Revision ID: 23e8468aaba3
Revises: 5e6e3c75fa2d
Create Date: 2023-03-09 01:56:34.397115

"""
import sqlalchemy as sa

from alembic import op
from timeboxx.pkg.config import settings

# revision identifiers, used by Alembic.
revision = "23e8468aaba3"
down_revision = "5e6e3c75fa2d"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "task",
        sa.Column("created_by_id", sa.Text(), nullable=True),
        schema=settings.DATABASE_SCHEMA,
    )
    op.add_column(
        "task",
        sa.Column("updated_by_id", sa.Text(), nullable=True),
        schema=settings.DATABASE_SCHEMA,
    )
    op.create_foreign_key(
        op.f("fk_task_created_by_id_user"),
        "task",
        "user",
        ["created_by_id"],
        ["id"],
        source_schema=settings.DATABASE_SCHEMA,
        referent_schema=settings.DATABASE_SCHEMA,
    )
    op.create_foreign_key(
        op.f("fk_task_updated_by_id_user"),
        "task",
        "user",
        ["updated_by_id"],
        ["id"],
        source_schema=settings.DATABASE_SCHEMA,
        referent_schema=settings.DATABASE_SCHEMA,
    )
    op.add_column(
        "timebox",
        sa.Column("created_by_id", sa.Text(), nullable=True),
        schema=settings.DATABASE_SCHEMA,
    )
    op.add_column(
        "timebox",
        sa.Column("updated_by_id", sa.Text(), nullable=True),
        schema=settings.DATABASE_SCHEMA,
    )
    op.create_foreign_key(
        op.f("fk_timebox_updated_by_id_user"),
        "timebox",
        "user",
        ["updated_by_id"],
        ["id"],
        source_schema=settings.DATABASE_SCHEMA,
        referent_schema=settings.DATABASE_SCHEMA,
    )
    op.create_foreign_key(
        op.f("fk_timebox_created_by_id_user"),
        "timebox",
        "user",
        ["created_by_id"],
        ["id"],
        source_schema=settings.DATABASE_SCHEMA,
        referent_schema=settings.DATABASE_SCHEMA,
    )
    op.add_column(
        "timeslot",
        sa.Column("created_by_id", sa.Text(), nullable=True),
        schema=settings.DATABASE_SCHEMA,
    )
    op.add_column(
        "timeslot",
        sa.Column("updated_by_id", sa.Text(), nullable=True),
        schema=settings.DATABASE_SCHEMA,
    )
    op.create_foreign_key(
        op.f("fk_timeslot_updated_by_id_user"),
        "timeslot",
        "user",
        ["updated_by_id"],
        ["id"],
        source_schema=settings.DATABASE_SCHEMA,
        referent_schema=settings.DATABASE_SCHEMA,
    )
    op.create_foreign_key(
        op.f("fk_timeslot_created_by_id_user"),
        "timeslot",
        "user",
        ["created_by_id"],
        ["id"],
        source_schema=settings.DATABASE_SCHEMA,
        referent_schema=settings.DATABASE_SCHEMA,
    )
    op.add_column(
        "user",
        sa.Column("created_by_id", sa.Text(), nullable=True),
        schema=settings.DATABASE_SCHEMA,
    )
    op.add_column(
        "user",
        sa.Column("updated_by_id", sa.Text(), nullable=True),
        schema=settings.DATABASE_SCHEMA,
    )
    op.create_foreign_key(
        op.f("fk_user_created_by_id_user"),
        "user",
        "user",
        ["created_by_id"],
        ["id"],
        source_schema=settings.DATABASE_SCHEMA,
        referent_schema=settings.DATABASE_SCHEMA,
    )
    op.create_foreign_key(
        op.f("fk_user_updated_by_id_user"),
        "user",
        "user",
        ["updated_by_id"],
        ["id"],
        source_schema=settings.DATABASE_SCHEMA,
        referent_schema=settings.DATABASE_SCHEMA,
    )


def downgrade() -> None:
    op.drop_constraint(
        op.f("fk_user_updated_by_id_user"),
        "user",
        schema=settings.DATABASE_SCHEMA,
        type_="foreignkey",
    )
    op.drop_constraint(
        op.f("fk_user_created_by_id_user"),
        "user",
        schema=settings.DATABASE_SCHEMA,
        type_="foreignkey",
    )
    op.drop_column("user", "updated_by_id", schema=settings.DATABASE_SCHEMA)
    op.drop_column("user", "created_by_id", schema=settings.DATABASE_SCHEMA)
    op.drop_constraint(
        op.f("fk_timeslot_created_by_id_user"),
        "timeslot",
        schema=settings.DATABASE_SCHEMA,
        type_="foreignkey",
    )
    op.drop_constraint(
        op.f("fk_timeslot_updated_by_id_user"),
        "timeslot",
        schema=settings.DATABASE_SCHEMA,
        type_="foreignkey",
    )
    op.drop_column("timeslot", "updated_by_id", schema=settings.DATABASE_SCHEMA)
    op.drop_column("timeslot", "created_by_id", schema=settings.DATABASE_SCHEMA)
    op.drop_constraint(
        op.f("fk_timebox_created_by_id_user"),
        "timebox",
        schema=settings.DATABASE_SCHEMA,
        type_="foreignkey",
    )
    op.drop_constraint(
        op.f("fk_timebox_updated_by_id_user"),
        "timebox",
        schema=settings.DATABASE_SCHEMA,
        type_="foreignkey",
    )
    op.drop_column("timebox", "updated_by_id", schema=settings.DATABASE_SCHEMA)
    op.drop_column("timebox", "created_by_id", schema=settings.DATABASE_SCHEMA)
    op.drop_constraint(
        op.f("fk_task_updated_by_id_user"),
        "task",
        schema=settings.DATABASE_SCHEMA,
        type_="foreignkey",
    )
    op.drop_constraint(
        op.f("fk_task_created_by_id_user"),
        "task",
        schema=settings.DATABASE_SCHEMA,
        type_="foreignkey",
    )
    op.drop_column("task", "updated_by_id", schema=settings.DATABASE_SCHEMA)
    op.drop_column("task", "created_by_id", schema=settings.DATABASE_SCHEMA)
