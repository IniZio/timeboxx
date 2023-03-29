import traceback

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from timeboxx.container import Container

router = APIRouter()


@router.get("/healthz")
@inject
async def healthz_route(
    session: Session = Depends(Provide[Container.session]),
):
    db_healthy = True
    try:
        print(session.scalar(text("SELECT 1")))
    except Exception as e:
        traceback.print_exception(e)
        db_healthy = False

    return {
        "db_healthy": db_healthy,
    }
