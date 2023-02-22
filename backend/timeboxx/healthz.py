from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from dependency_injector.wiring import inject, Provide, Closing
from timeboxx.container import Container
from timeboxx.pkg.task.service import TaskService

router = APIRouter()

@router.get("/healthz")
@inject
async def healthz_route(
    db_session = Closing[Provide[Container.session]],
    task_service: TaskService = Depends(Provide[Container.task_service]),
):
    errors: list[Exception] = []

    db_healthy = True
    try:
        print(await task_service.list_tasks())
        pass
    except Exception as e:
        errors.append(e)
        db_healthy = False

    if len(errors) != 0:
        print(errors)

    return {"db_healthy": db_healthy}