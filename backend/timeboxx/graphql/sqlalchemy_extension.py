from sqlalchemy.orm import Session
from starlette.requests import ClientDisconnect
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
        except Exception as e:
            session.rollback()

            if isinstance(e, ClientDisconnect):
                # If the client disconnects, we don't want to raise an exception
                # because it's not really an error
                return

            raise
        finally:
            session.close()
