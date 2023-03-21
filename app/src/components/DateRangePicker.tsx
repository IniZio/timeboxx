import { DateValue } from "@internationalized/date";
import { Calendar } from "iconoir-react";
import { useRef } from "react";
import { AriaDateRangePickerProps, useDateRangePicker } from "react-aria";
import { useDateRangePickerState } from "react-stately";

import { Button } from "@/components/Button";
import { DateField } from "@/components/DateField";
import { Dialog } from "@/components/Dialog";
import { Popover } from "@/components/Popover";
import { RangeCalendar } from "@/components/RangeCalendar";

export function DateRangePicker(props: AriaDateRangePickerProps<DateValue>) {
  const state = useDateRangePickerState(props);
  const ref = useRef(null);
  const { labelProps, groupProps, startFieldProps, endFieldProps, buttonProps, dialogProps, calendarProps } =
    useDateRangePicker(props, state, ref);

  return (
    <div className="inline-flex flex-col">
      <span {...labelProps}>{props.label}</span>
      <div {...groupProps} ref={ref} className="flex gap-x-0.5 text-gray-500">
        <div className="inline-flex">
          <DateField {...startFieldProps} />
          <span className="px-0.5">-</span>
          <DateField {...endFieldProps} />
          {state.validationState === "invalid" && <span aria-hidden="true">🚫</span>}
        </div>
        <Button {...buttonProps}>
          <Calendar width={16} height={16} />
        </Button>
      </div>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <Dialog {...dialogProps}>
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
