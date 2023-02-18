import strawberry

from .query import Query

public_schema = strawberry.Schema(Query)
