import dayjs from "dayjs";
import { useCallback, useMemo } from "react";

import { TimeboxItemTimebox } from "@/modules/today/view-models";

export interface TimeboxItemProps {
  timebox: TimeboxItemTimebox;
  onClick?: (timebox: TimeboxItemTimebox) => void;
}

export const TimeboxItem: React.FC<TimeboxItemProps> = ({ timebox, onClick }) => {
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

  const handleClick = useCallback(() => {
    onClick?.(timebox);
  }, [onClick, timebox]);

  return (
    <button un-flex="~ row" un-justify="center" un-items="center" un-gap="4" un-p="3" un-w="full" onClick={handleClick}>
      <input type="checkbox" />
      <p un-flex="1" un-leading="normal" un-text="left gray-900" un-line-clamp="2">
        {timebox.title}
      </p>
      <span className="text-sm text-right text-gray-500 h-min">{formattedPeriod}</span>
    </button>
  );
};
