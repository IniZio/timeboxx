import { Plus } from "iconoir-react";
import { ChangeEvent, KeyboardEventHandler, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { TimeRangePicker } from "@/components/TimeRangePicker";
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
  const [dateRange, setDateRange] = useState(() => [new Date(), new Date()] as [Maybe<Date>, Maybe<Date>]);

  const onChangeTitle = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  }, []);

  const onChangeDateRange = useCallback((value: InputValue["dateRange"]) => {
    setDateRange(value);
  }, []);

  const reset = useCallback(() => {
    setTitle(""), setDateRange([new Date(), new Date()]);
  }, []);

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (evt) => {
      if (evt.key === "Enter") {
        onSubmit({ title, dateRange });
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
      <input
        className="leading-7 w-full text-gray-900 text-base focus:outline-none"
        placeholder={t("modules.today.components.CreateTimeboxInput.title.placeholder")}
        value={title}
        onChange={onChangeTitle}
        onKeyDown={handleKeyDown}
      />
      <TimeRangePicker value={dateRange} onChange={onChangeDateRange} />
    </div>
  );
};
