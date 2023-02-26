import dayjs from "dayjs";
import dayjsTimezone from "dayjs/plugin/timezone";
import dayjsUTC from "dayjs/plugin/utc";

dayjs.extend(dayjsUTC);
dayjs.extend(dayjsTimezone);
