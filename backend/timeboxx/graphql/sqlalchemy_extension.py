from sqlalchemy.ext.asyncio import AsyncSession
from strawberry.extensions import SchemaExtension


# The sqlalchemy middlware doesn't work well with strawberry,
# so we manually add the db session context here
class SqlalchemyExtension(SchemaExtension):
    async def on_operation(self):
        session: AsyncSession = self.execution_context.context.session

        try:
            yield
            if session.is_active:
                await session.commit()
        except:
            await session.rollback()
            raise
        finally:
            await session.close()
