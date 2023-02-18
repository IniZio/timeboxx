from fastapi import FastAPI

from timeboxx.pkg.db import db_session
from timeboxx.pkg.db_models.user import User

app = FastAPI()


@app.get("/")
async def main_route():
    with db_session() as db:
        users = db.query(User).all()
        user_ids = list(map(lambda u: u.id, users))

        return {"message": user_ids}
