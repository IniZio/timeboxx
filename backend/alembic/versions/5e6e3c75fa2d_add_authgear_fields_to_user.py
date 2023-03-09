"""'Add authgear fields to user'

Revision ID: 5e6e3c75fa2d
Revises: 03d3bea9bf2e
Create Date: 2023-03-08 00:08:54.948711

"""
import sqlalchemy as sa

from alembic import op
from timeboxx.pkg.config import AlembicSettings

# revision identifiers, used by Alembic.
revision = "5e6e3c75fa2d"
down_revision = "03d3bea9bf2e"
branch_labels = None
depends_on = None


settings = AlembicSettings.from_env()


def upgrade() -> None:
    op.add_column(
        "user",
        sa.Column("authgear_id", sa.Text(), nullable=False),
        schema=settings.DATABASE_SCHEMA,
    )
    op.add_column(
        "user",
        sa.Column("name", sa.Text(), nullable=True),
        schema=settings.DATABASE_SCHEMA,
    )
    op.add_column(
        "user",
        sa.Column("email", sa.Text(), nullable=True),
        schema=settings.DATABASE_SCHEMA,
    )
    op.create_unique_constraint(
        op.f("uq_user_authgear_id"),
        "user",
        ["authgear_id"],
        schema=settings.DATABASE_SCHEMA,
    )


def downgrade() -> None:
    op.drop_constraint(
        op.f("uq_user_authgear_id"),
        "user",
        schema=settings.DATABASE_SCHEMA,
        type_="unique",
    )
    op.drop_column("user", "email", schema=settings.DATABASE_SCHEMA)
    op.drop_column("user", "name", schema=settings.DATABASE_SCHEMA)
    op.drop_column("user", "authgear_id", schema=settings.DATABASE_SCHEMA)
