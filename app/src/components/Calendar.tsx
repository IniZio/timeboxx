import { createCalendar, DateValue } from "@internationalized/date";
import { CalendarProps, useCalendar, useLocale } from "react-aria";
import { useCalendarState } from "react-stately";

import { Button } from "@/components/Button";
import { CalendarGrid } from "@/components/CalendarGrid";

export function Calendar(props: CalendarProps<DateValue>) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(props, state);

  return (
    <div {...calendarProps} className="calendar">
      <div className="header">
        <h2>{title}</h2>
        <Button {...prevButtonProps}>&lt;</Button>
        <Button {...nextButtonProps}>&gt;</Button>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}
