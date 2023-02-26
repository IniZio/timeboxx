import debugpy
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_async_sqlalchemy import SQLAlchemyMiddleware

from timeboxx.container import Container
from timeboxx.graphql.router import router as graphql_router
from timeboxx.healthz import router as healthz_router
from timeboxx.pkg.config import settings

# TODO: Disable under production
debugpy.listen(("0.0.0.0", 5678))

container = Container()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    SQLAlchemyMiddleware,
    db_url=settings.ASYNC_DATABASE_URL,
    commit_on_exit=True,
    engine_args={"echo": True},
)

app.include_router(healthz_router)
app.include_router(graphql_router, prefix="/graphql")
