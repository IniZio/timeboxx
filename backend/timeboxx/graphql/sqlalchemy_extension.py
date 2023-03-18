from inspect import isawaitable

from sqlalchemy.ext.asyncio import AsyncSession
from strawberry.extensions import Extension


# The sqlalchemy middlware doesn't work well with strawberry,
# so we manually add the db session context here
class SqlalchemyExtension(Extension):
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

            if session.is_active:
                await session.commit()

            return resolved
        except:
            await session.rollback()
            raise
        finally:
            await session.close()
