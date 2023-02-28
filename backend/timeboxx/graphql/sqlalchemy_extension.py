from fastapi_async_sqlalchemy import db
from strawberry.extensions import Extension


# The sqlalchemy middlware doesn't work well with strawberry,
# so we manually add the db session context here
class SqlalchemyExtension(Extension):
    async def on_request_start(self):
        async with db(commit_on_exit=True):
            return super().on_request_start()
