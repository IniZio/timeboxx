from strawberry.fastapi import GraphQLRouter

from timeboxx.graphql.schema import public_schema

router = GraphQLRouter(public_schema)


@router.on_event("startup")
async def startup_event():
    try:
        from strawberry.printer import print_schema

        with open("../public_schema.graphql", "w") as public_schema_file:
            public_schema_file.write(print_schema(public_schema) + "\n")
    except:
        pass
