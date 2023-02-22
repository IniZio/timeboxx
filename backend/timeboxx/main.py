from datetime import datetime
from dependency_injector.wiring import Provide, inject
from fastapi import Depends, FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from timeboxx.container import Container
from timeboxx.graphql.router import router as graphql_router
from timeboxx.healthz import router as healthz_router
from timeboxx.pkg.config import settings
from timeboxx.pkg.db import db_session
# from timeboxx.pkg.db1 import Database
from timeboxx.pkg.db_models.task import Task

# from timeboxx.pkg.db import db_session
from timeboxx.pkg.db_models.user import User
from timeboxx.pkg.task.service import TaskService

# db = Database()
container = Container()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(healthz_router)
app.include_router(graphql_router, prefix="/graphql")

# @app.middleware('http')
# async def threadlocal(request: Request, call_next):
#     try:
#         response: Response = await call_next(request)
#     finally:
#         print("DSFDSF")
#         container.session.reset()

#     return response