import { parseAbsoluteToLocal } from "@internationalized/date";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";

import { DateRangePicker } from "@/components/DateRangePicker";
import { TimeboxItemTimebox } from "@/modules/timeboxes/view-models";

export interface TimeboxItemProps {
  timebox: TimeboxItemTimebox;
  onClick?: (timebox: TimeboxItemTimebox) => void;
}

export const TimeboxItem: React.FC<TimeboxItemProps> = ({ timebox, onClick }) => {
  const dateRange = useMemo(
    () => ({
      start: parseAbsoluteToLocal(dayjs(timebox.startTime).toISOString()),
      end: parseAbsoluteToLocal(dayjs(timebox.endTime).toISOString()),
    }),
    [timebox.endTime, timebox.startTime],
  );

  const handleClick = useCallback(() => {
    onClick?.(timebox);
  }, [onClick, timebox]);

  return (
    <button un-flex="~ row" un-justify="center" un-items="center" un-gap="4" un-p="3" un-w="full" onClick={handleClick}>
      <input type="checkbox" />
      <div className="flex flex-1 flex-col">
        <p un-flex="1" un-leading="normal" un-text="left gray-900" un-line-clamp="2">
          {timebox.title}
        </p>
        <DateRangePicker value={dateRange} isReadOnly />
      </div>
    </button>
  );
};
