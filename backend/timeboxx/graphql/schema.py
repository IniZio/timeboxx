from datetime import datetime

import strawberry

from timeboxx.graphql.mapper import sqlalchemy_mapper
from timeboxx.graphql.mutation import Mutation
from timeboxx.graphql.query import Query
from timeboxx.graphql.scalars import TimezoneNaiveDateTime
from timeboxx.graphql.sqlalchemy_extension import SqlalchemyExtension

sqlalchemy_mapper.finalize()
additional_types = list(sqlalchemy_mapper.mapped_types.values())

public_schema = strawberry.Schema(
    extensions=[SqlalchemyExtension],
    query=Query,
    mutation=Mutation,
    types=additional_types,
    scalar_overrides={
        # TODO: Override for `Time` as well
        datetime: TimezoneNaiveDateTime,
    },
)
