import dayjs from "dayjs";
import { useMemo } from "react";

import { TimeboxItemTimebox } from "@/modules/today/view-models";

export interface TimeboxItemProps {
  timebox: TimeboxItemTimebox;
}

export const TimeboxItem: React.FC<TimeboxItemProps> = ({ timebox }) => {
  const formattedPeriod = useMemo(() => {
    const format = "h:mma";

    if (timebox.startTime && timebox.endTime) {
      return `${dayjs(timebox.startTime).format(format)} - ${dayjs(timebox.endTime).format(format)}`;
    }
    if (timebox.startTime) {
      return dayjs(timebox.startTime).format(format);
    }
    if (timebox.endTime) {
      return dayjs(timebox.endTime).format(format);
    }

    return "-";
  }, [timebox.startTime, timebox.endTime]);

  return (
    <li un-flex="~ row" un-justify="center" un-items="center" un-gap="4" un-p="3">
      <input type="checkbox" />
      <p un-flex="1" un-leading="7" un-text="gray-900" un-line-clamp="2">
        {timebox.title}
      </p>
      <span className="text-sm leading-7 text-right text-gray-500 h-min">{formattedPeriod}</span>
    </li>
  );
};
