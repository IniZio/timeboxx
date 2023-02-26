from datetime import datetime

import pytz
import strawberry

# Clients usually prefer value with clear timezone info,
# whereas server and db prefer normalizing to timezone-naive asap
TimezoneNaiveDateTime = strawberry.scalar(
    datetime,
    name="DateTime",
    serialize=lambda value: value.replace(tzinfo=pytz.utc).isoformat(),
    parse_value=lambda value: datetime.fromisoformat(value)
    .astimezone(pytz.utc)
    .replace(tzinfo=None),
)
