from dependency_injector.wiring import Provide, inject
from fastapi import Depends
from fastapi_async_sqlalchemy import db
from strawberry.fastapi import GraphQLRouter
from strawberry_sqlalchemy_mapper import StrawberrySQLAlchemyLoader

from timeboxx.container import Container
from timeboxx.graphql.context import Context
from timeboxx.graphql.schema import public_schema
from timeboxx.pkg.task.service import TaskService


@inject
def get_context(task_service: TaskService = Depends(Provide[Container.task_service])):
    return Context(
        sqlalchemy_loader=StrawberrySQLAlchemyLoader(bind=db.session),
        task_service=task_service,
    )


router = GraphQLRouter(public_schema, context_getter=get_context)


@router.on_event("startup")
async def startup_event():
    try:
        from strawberry.printer import print_schema

        with open("../public_schema.graphql", "w") as public_schema_file:
            public_schema_file.write(print_schema(public_schema) + "\n")
    except:
        pass
