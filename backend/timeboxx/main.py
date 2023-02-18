from fastapi import FastAPI

from timeboxx.graphql.router import router as graphql_router
from timeboxx.pkg.db import db_session
from timeboxx.pkg.db_models.user import User

app = FastAPI()


@app.get("/healthz")
async def main_route():
    db_healthy = True
    try:
        with db_session() as db:
            db.query(User).limit(1).all()
    except Exception:
        db_healthy = False

    return {"db_healthy": db_healthy}


app.include_router(graphql_router, prefix="/graphql")
