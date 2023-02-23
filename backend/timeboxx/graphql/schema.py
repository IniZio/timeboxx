import strawberry

from .mapper import sqlalchemy_mapper
from .query import Query

sqlalchemy_mapper.finalize()
additional_types = list(sqlalchemy_mapper.mapped_types.values())

public_schema = strawberry.Schema(
    query=Query,
    types=additional_types,
)
