from inspect import isawaitable

from sqlalchemy.ext.asyncio import AsyncSession
from strawberry.extensions import Extension


# The sqlalchemy middlware doesn't work well with strawberry,
# so we manually add the db session context here
class SqlalchemyExtension(Extension):
    def on_request_end(self):
        super().on_request_end()

    async def resolve(self, _next, root, info, *args, **kwargs):
        session: AsyncSession = info.context.session

        # Only commit and close session at root resolver
        if root:
            resolved = super().resolve(_next, root, info, *args, **kwargs)
            if isawaitable(resolved):
                resolved = await resolved

            return resolved

        try:
            resolved = super().resolve(_next, root, info, *args, **kwargs)
            if isawaitable(resolved):
                resolved = await resolved

            if (
                not root
                and session.is_active
                and (session.dirty or session.new or session.deleted)
            ):
                await session.commit()

            return resolved
        except:
            await session.rollback()
            raise
        finally:
            await session.close()
