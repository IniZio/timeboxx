import { DateValue } from "@internationalized/date";
import dayjs from "dayjs";
import { Calendar } from "iconoir-react";
import { useMemo, useRef } from "react";
import { AriaDateRangePickerProps, useDateRangePicker } from "react-aria";
import { useDateRangePickerState } from "react-stately";

import { Button } from "@/components/Button";
import { DateField } from "@/components/DateField";
import { Dialog } from "@/components/Dialog";
import { Popover } from "@/components/Popover";
import { RangeCalendar } from "@/components/RangeCalendar";
import { TimeField, TimeFieldProps } from "@/components/TimeField";

export type DateRangePickerProps = AriaDateRangePickerProps<DateValue>;

export function DateRangePicker(props: DateRangePickerProps) {
  const state = useDateRangePickerState(props);
  const ref = useRef(null);
  const { labelProps, groupProps, startFieldProps, endFieldProps, buttonProps, dialogProps, calendarProps } =
    useDateRangePicker(props, state, ref);

  const isSameDay = useMemo(
    () => dayjs(state.dateRange.start.toDate("")).isSame(state.dateRange.end.toDate(""), "day"),
    [state.dateRange.end, state.dateRange.start],
  );

  return (
    <div className="inline-flex flex-col">
      <span {...labelProps}>{props.label}</span>
      <div {...groupProps} ref={ref} className="flex gap-x-0.5 text-gray-500">
        <div className="inline-flex">
          {isSameDay ? (
            <TimeField {...(startFieldProps as unknown as TimeFieldProps)} />
          ) : (
            <DateField {...startFieldProps} />
          )}
          <span className="px-0.5">-</span>
          {isSameDay ? (
            <TimeField {...(endFieldProps as unknown as TimeFieldProps)} />
          ) : (
            <DateField {...endFieldProps} />
          )}
          {/* {state.validationState === "invalid" && <span aria-hidden="true">🚫</span>} */}
        </div>
        {!props.isReadOnly && (
          <Button {...buttonProps}>
            <Calendar className="mb-px" width={16} height={16} />
          </Button>
        )}
      </div>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <Dialog {...dialogProps} className="p-4 w-60 bg-white">
            <RangeCalendar {...calendarProps} />
          </Dialog>
        </Popover>
      )}
    </div>
  );
}

DateRangePicker.defaultProps = {
  hideTimeZone: true,
} as Partial<AriaDateRangePickerProps<DateValue>>;
