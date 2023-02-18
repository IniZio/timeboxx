from strawberry.fastapi import GraphQLRouter

from timeboxx.graphql.schema import public_schema

router = GraphQLRouter(public_schema)
