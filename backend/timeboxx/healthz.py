import traceback

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from timeboxx.container import Container
from timeboxx.pkg.config import MainSettings

router = APIRouter()


@router.get("/healthz")
@inject
async def healthz_route(
    settings: MainSettings = Depends(Provide[Container.settings]),
    session: AsyncSession = Depends(Provide[Container.session]),
):
    db_healthy = True
    try:
        print(await session.scalar(text("SELECT 1")))
    except Exception as e:
        traceback.print_exception(e)
        db_healthy = False

    return {
        "db_healthy": db_healthy,
        "key": settings.AUTHGEAR_ADMIN_API_KEY.replace("\\n", "\n"),
    }
