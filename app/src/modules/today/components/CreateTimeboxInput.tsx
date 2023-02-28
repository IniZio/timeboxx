import { useAtom } from "@iniz/react";
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

  const title = useAtom("");
  const handleChangeTitle = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      title(evt.target.value);
    },
    [title],
  );

  const [dateRange, setDateRange] = useState(() => [new Date(), null] as [Maybe<Date>, Maybe<Date>]);

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (evt) => {
      if (evt.key === "Enter") {
        onSubmit({ title: title(), dateRange });

        title("");
        setDateRange([new Date(), null]);

        return;
      }
    },
    [dateRange, onSubmit, title],
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
        className="leading-7 w-full text-base text-gray-900 focus:outline-none"
        placeholder={t("modules.today.components.CreateTimeboxInput.title.placeholder")}
        value={title()}
        onChange={handleChangeTitle}
        onKeyDown={handleKeyDown}
      />
      <TimeRangePicker value={dateRange} onChange={setDateRange} />
    </div>
  );
};
