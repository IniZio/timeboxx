from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from timeboxx.graphql.router import router as graphql_router
from timeboxx.pkg.db import db_session
from timeboxx.pkg.db_models.user import User

# TODO: env variable
allowed_origins = [
    "http://localhost:5173",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/healthz")
async def healthz_route():
    errors: list[Exception] = []

    db_healthy = True
    try:
        async with db_session() as db:
            # db.add(User())
            (await db.execute(select(User).limit(0))).all()
    except Exception as e:
        errors.append(e)
        db_healthy = False

    if len(errors) != 0:
        print(errors)

    return {"db_healthy": db_healthy}


app.include_router(graphql_router, prefix="/graphql")
