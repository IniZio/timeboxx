import { parseAbsoluteToLocal } from "@internationalized/date";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";

import { DateRangePicker } from "@/components/DateRangePicker";
import { TimeboxItemTimebox } from "@/modules/timeboxes/view-models";
import { cn } from "@/utils";

export interface TimeboxItemProps {
  timebox: TimeboxItemTimebox;
  onClick?: (timebox: TimeboxItemTimebox) => void;
  isActive?: boolean;
}

export const TimeboxItem: React.FC<TimeboxItemProps> = ({ timebox, isActive, onClick }) => {
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
    <button
      className={cn("rounded hover:shadow shadow-none transition-shadow", isActive && "shadow")}
      un-flex="~ row"
      un-justify="center"
      un-items="center"
      un-gap="4"
      un-p="3"
      un-w="full"
      onClick={handleClick}
    >
      <input type="checkbox" />
      <div className="flex flex-col flex-1">
        <p un-flex="1" un-leading="normal" un-text="left gray-900" un-line-clamp="2">
          {timebox.title}
        </p>
        <DateRangePicker value={dateRange} isReadOnly />
      </div>
    </button>
  );
};
