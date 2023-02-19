"""Create user

Revision ID: 027fe07b03a5
Revises: 385bda55521a
Create Date: 2023-02-18 10:53:42.757692

"""
import sqlalchemy as sa

from alembic import op
from timeboxx.pkg.config import settings

# revision identifiers, used by Alembic.
revision = "027fe07b03a5"
down_revision = "385bda55521a"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "user",
        sa.Column("id", sa.Text(), nullable=False),
        sa.Column(
            "created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_user")),
        schema=settings.DATABASE_SCHEMA,
    )


def downgrade() -> None:
    op.drop_table("user", schema=settings.DATABASE_SCHEMA)
