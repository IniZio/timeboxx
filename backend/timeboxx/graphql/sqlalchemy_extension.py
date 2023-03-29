from sqlalchemy.orm import Session
from strawberry.extensions import SchemaExtension


# The sqlalchemy middlware doesn't work well with strawberry,
# so we manually add the db session context here
class SqlalchemyExtension(SchemaExtension):
    async def on_operation(self):
        session: Session = self.execution_context.context.session

        try:
            yield
            if session.is_active:
                session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()
