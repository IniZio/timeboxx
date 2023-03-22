import { DateValue, ZonedDateTime } from "@internationalized/date";
import dayjs, { PluginFunc } from "dayjs";
import dayjsIsBetween from "dayjs/plugin/isBetween";
import dayjsToday from "dayjs/plugin/isToday";
import dayjsTimezone from "dayjs/plugin/timezone";
import dayjsUTC from "dayjs/plugin/utc";

declare module "dayjs" {
  export function fromDateValue(zoned: DateValue): Dayjs;
}

const dayjsInternalized: PluginFunc = (_option, _dayjsClass, dayjsFactory) => {
  // FIXME: Only handle ZonedDateTime for now
  dayjsFactory.fromDateValue = (dateValue) => dayjs((dateValue as ZonedDateTime).toDate());
};

dayjs.extend(dayjsUTC);
dayjs.extend(dayjsTimezone);
dayjs.extend(dayjsIsBetween);
dayjs.extend(dayjsToday);
dayjs.extend(dayjsInternalized);
