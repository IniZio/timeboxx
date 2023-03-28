import { createCalendar, DateValue } from "@internationalized/date";
import { useRef } from "react";
import { RangeCalendarProps, useLocale, useRangeCalendar } from "react-aria";
import { useRangeCalendarState } from "react-stately";

import { Button } from "@/components/Button";
import { CalendarGrid } from "@/components/CalendarGrid";

export function RangeCalendar(props: RangeCalendarProps<DateValue>) {
  const { locale } = useLocale();
  const state = useRangeCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { calendarProps, prevButtonProps, nextButtonProps, title } = useRangeCalendar(props, state, ref);

  return (
    <div {...calendarProps} ref={ref} className="calendar">
      <div className="header">
        <h2>{title}</h2>
        <Button {...prevButtonProps}>&lt;</Button>
        <Button {...nextButtonProps}>&gt;</Button>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}
