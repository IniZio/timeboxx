import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";
import dayjs from "dayjs";
import { Plus } from "iconoir-react";
import { ChangeEvent, KeyboardEventHandler, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { DateRangePicker } from "@/components/DateRangePicker";
import { RangeValue } from "@/components/react-aria";
import { cn } from "@/utils";

export interface CreateTimeboxInputProps {
  className?: string;
  defaultValue?: InputValue;
  onSubmit: (value: InputValue) => void;
}

interface InputValue {
  title: string;
  dateRange: [Maybe<Date>, Maybe<Date>];
}

export const CreateTimeboxInput: React.FC<CreateTimeboxInputProps> = ({ className, defaultValue, onSubmit }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState(defaultValue?.title ?? "");
  const [dateRange, setDateRange] = useState<RangeValue<DateValue>>(() => ({
    start: parseAbsoluteToLocal(dayjs(defaultValue?.dateRange[0]).toISOString()),
    end: parseAbsoluteToLocal(dayjs(defaultValue?.dateRange[1]).toISOString()),
  }));

  const onChangeTitle = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  }, []);

  const reset = useCallback(() => {
    setTitle(defaultValue?.title ?? "");
    setDateRange({
      start: parseAbsoluteToLocal(dayjs(defaultValue?.dateRange[0]).toISOString()),
      end: parseAbsoluteToLocal(dayjs(defaultValue?.dateRange[1]).toISOString()),
    });
  }, [defaultValue?.dateRange, defaultValue?.title]);

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (evt) => {
      if (evt.key === "Enter") {
        onSubmit({
          title,
          dateRange: [dayjs.fromDateValue(dateRange.start).toDate(), dayjs.fromDateValue(dateRange.end).toDate()],
        });
        reset();
        return;
      }
    },
    [dateRange, onSubmit, reset, title],
  );

  return (
    <div
      className={cn(
        "items-center inline-flex space-x-2 justify-start",
        "p-3",
        "bg-white shadow-sm border rounded-md",
        "focus-within:ring",
        className,
      )}
    >
      <Plus height={24} width={24} un-flex="none" un-text="gray-900" />
      <div className="flex flex-col flex-1">
        <input
          className="leading-7 w-full text-gray-900 text-base focus:outline-none"
          placeholder={t("modules.today.components.CreateTimeboxInput.title.placeholder")}
          value={title}
          onChange={onChangeTitle}
          onKeyDown={handleKeyDown}
        />
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>
    </div>
  );
};
