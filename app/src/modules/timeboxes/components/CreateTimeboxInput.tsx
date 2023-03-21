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
  onSubmit: (value: InputValue) => void;
}

interface InputValue {
  title: string;
  dateRange: [Maybe<Date>, Maybe<Date>];
}

export const CreateTimeboxInput: React.FC<CreateTimeboxInputProps> = ({ className, onSubmit }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [dateRange, setDateRange] = useState<RangeValue<DateValue>>(() => ({
    start: parseAbsoluteToLocal(dayjs().toISOString()),
    end: parseAbsoluteToLocal(dayjs().toISOString()),
  }));

  const onChangeTitle = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  }, []);

  const reset = useCallback(() => {
    setTitle("");
    setDateRange({
      start: parseAbsoluteToLocal(new Date().toISOString()),
      end: parseAbsoluteToLocal(new Date().toISOString()),
    });
  }, []);

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (evt) => {
      if (evt.key === "Enter") {
        onSubmit({ title, dateRange: [dateRange.start.toDate(""), dateRange.end.toDate("")] });
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
        "p-3 w-full",
        "bg-white shadow border rounded-md border-gray-200",
        "focus-within:ring",
        className,
      )}
    >
      <Plus height={24} width={24} un-flex="none" un-text="gray-900" />
      <div className="flex flex-1 flex-col">
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
