import traceback

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends

from timeboxx.container import Container
from timeboxx.pkg.task.service import TaskService

router = APIRouter()


@router.get("/healthz")
@inject
async def healthz_route(
    task_service: TaskService = Depends(Provide[Container.task_service]),
):
    db_healthy = True
    try:
        print(await task_service.list_tasks())
    except Exception as e:
        traceback.print_exception(e)
        db_healthy = False

    return {"db_healthy": db_healthy}
