import { DateValue } from "@internationalized/date";
import { Calendar as CalendarIcon } from "iconoir-react";
import { forwardRef, useRef } from "react";
import { AriaDatePickerProps, useDatePicker } from "react-aria";
import { useDatePickerState } from "react-stately";

import { Button } from "@/components/Button";
import { Calendar } from "@/components/Calendar";
import { DateField } from "@/components/DateField";
import { Dialog } from "@/components/Dialog";
import { Popover } from "@/components/Popover";
import { cn } from "@/utils";

export type DateTimePickerProps = AriaDatePickerProps<DateValue> & {
  className?: string;
};

export const DateTimePicker = forwardRef<HTMLDivElement, DateTimePickerProps>((props: DateTimePickerProps, ref) => {
  const state = useDatePickerState(props);
  const fieldRef = useRef(null);

  const { labelProps, groupProps, fieldProps, buttonProps, dialogProps, calendarProps } = useDatePicker(
    props,
    state,
    fieldRef,
  );

  return (
    <div className={cn("inline-flex flex-col text-gray-500", props.className)} ref={ref}>
      <span {...labelProps}>{props.label}</span>
      <div {...groupProps} ref={fieldRef} className="flex gap-x-0.5">
        <DateField {...fieldProps} />
        {!props.isReadOnly && (
          <Button {...buttonProps}>
            <CalendarIcon className="mb-px" width={16} height={16} />
          </Button>
        )}
      </div>
      {state.isOpen && (
        <Popover state={state} triggerRef={fieldRef} placement="bottom start">
          <Dialog {...dialogProps} className="p-4 w-60 bg-white">
            <Calendar {...calendarProps} />
          </Dialog>
        </Popover>
      )}
    </div>
  );
});

DateTimePicker.displayName = "DateTimePicker";

DateTimePicker.defaultProps = {
  hideTimeZone: true,
} as Partial<AriaDatePickerProps<DateValue>>;
