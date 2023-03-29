import logging

logging.basicConfig(level=logging.DEBUG)

import debugpy
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

from timeboxx.container import Container
from timeboxx.graphql.router import router as graphql_router
from timeboxx.healthz import router as healthz_router
from timeboxx.website import get_index_html

# from fastapi_async_sqlalchemy import SQLAlchemyMiddleware


# TODO: Disable under production
debugpy.listen(("0.0.0.0", 5678))

container = Container()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=container.settings().CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# app.add_middleware(
#     SQLAlchemyMiddleware,
#     db_url=container.settings().ASYNC_DATABASE_URL,
#     commit_on_exit=True,
#     engine_args={"echo": True},
# )

app.include_router(healthz_router)
app.include_router(graphql_router, prefix="/graphql")


@app.exception_handler(404)
def index_html(request, exc):
    return HTMLResponse(get_index_html(), media_type="text/html")


# FIXME: Not sure why cannot move to .website yet
app.mount("/", StaticFiles(directory="timeboxx/public", check_dir=False))
