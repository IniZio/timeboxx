import "./CalendarGrid.css";

import { CalendarDate, getWeeksInMonth } from "@internationalized/date";
import { useRef } from "react";
import { useCalendarCell, useCalendarGrid, useLocale } from "react-aria";
import { CalendarState, RangeCalendarState } from "react-stately";

export function CalendarGrid({ state, ...props }: { state: CalendarState | RangeCalendarState }) {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) => (date ? <CalendarCell key={i} state={state} date={date} /> : <td key={i} />))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CalendarCell({ state, date }: { state: CalendarState | RangeCalendarState; date: CalendarDate }) {
  const ref = useRef(null);
  const { cellProps, buttonProps, isSelected, isOutsideVisibleRange, isDisabled, isUnavailable, formattedDate } =
    useCalendarCell({ date }, state, ref);

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={`cell ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""} ${
          isUnavailable ? "unavailable" : ""
        }`}
      >
        {formattedDate}
      </div>
    </td>
  );
}
