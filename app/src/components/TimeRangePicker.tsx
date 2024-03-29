import "./TimeRangePicker.css";

import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import { Calendar } from "iconoir-react";

export interface TimeRangePickerProps {
  value: [Maybe<Date>, Maybe<Date>];
  onChange: ([start, end]: [Maybe<Date>, Maybe<Date>]) => void;
}

export const TimeRangePicker: React.FC<TimeRangePickerProps> = ({ value, onChange }) => {
  return (
    <DateTimeRangePicker
      className="text-gray-500 leading-7 text-sm text-right h-min flex-none"
      value={value}
      onChange={onChange}
      disableCalendar
      disableClock
      calendarIcon={<Calendar />}
      clearIcon={null}
      rangeDivider=" - "
    />
  );
};
