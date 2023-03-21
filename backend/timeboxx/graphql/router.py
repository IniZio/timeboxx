from dependency_injector.wiring import Provide, inject
from fastapi import Depends
from fastapi_async_sqlalchemy import db
from sqlalchemy.ext.asyncio import AsyncSession
from strawberry.fastapi import GraphQLRouter
from strawberry_sqlalchemy_mapper import StrawberrySQLAlchemyLoader

from timeboxx.container import Container
from timeboxx.graphql.context import Context
from timeboxx.graphql.schema import public_schema
from timeboxx.pkg.auth.service import AuthService
from timeboxx.pkg.task.service import TaskService
from timeboxx.pkg.timebox.service import TimeboxService


@inject
def get_context(
    session: AsyncSession = Depends(Provide[Container.session]),
    auth_service: AuthService = Depends(Provide[Container.auth_service]),
    task_service: TaskService = Depends(Provide[Container.task_service]),
    timebox_service: TimeboxService = Depends(Provide[Container.timebox_service]),
):
    return Context(
        session=session,
        sqlalchemy_loader=StrawberrySQLAlchemyLoader(bind=session),
        auth_service=auth_service,
        task_service=task_service,
        timebox_service=timebox_service,
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
