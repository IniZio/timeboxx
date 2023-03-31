import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";
import { RangeValue } from "@react-types/shared";
import dayjs from "dayjs";
import { Plus } from "iconoir-react";
import { Key, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Item } from "react-stately";
import { useDebounce } from "react-use";
import { useMutation, useQuery } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { FormDateRangePicker } from "@/components/form/FormDateRangePicker";
import { FormTimeboxTaskInput } from "@/modules/timeboxes/components/TimeboxTaskInput";
import { cn } from "@/utils";

export interface CreateTimeboxInputProps {
  className?: string;
}

export const SuggestTasksQuery = graphql(`
  query SuggestTasks($keyword: String) {
    tasks(keyword: $keyword) {
      id
      title
    }
  }
`);

const CreateTimeboxMutation = graphql(`
  mutation CreateTimebox($input: CreateTimeboxInput!) {
    createTimebox(input: $input) {
      id
      task {
        id
        title
      }
      title
      description
      startTime
      endTime
    }
  }
`);

type CreateTimeboxForm = {
  title: Maybe<string>;
  task: { id: Maybe<Key>; title: Maybe<string> };
  dateRange: RangeValue<DateValue>;
};

export const CreateTimeboxInput: React.FC<CreateTimeboxInputProps> = ({ className }) => {
  const { t } = useTranslation();

  const timeboxForm = useForm<CreateTimeboxForm>({
    defaultValues: {
      title: "",
      task: { id: null, title: "" },
      dateRange: {
        start: parseAbsoluteToLocal(dayjs().toISOString()),
        end: parseAbsoluteToLocal(dayjs().toISOString()),
      },
    },
  });

  const [suggestedTasks, refetchSuggesstedTasks] = useQuery({
    query: SuggestTasksQuery,
    requestPolicy: "cache-and-network",
    pause: true,
    variables: { keyword: timeboxForm.getValues().title || timeboxForm.getValues().task.title || "" },
  });
  const [_, createTimeboxMutation] = useMutation(CreateTimeboxMutation);

  const timeboxTitle = useWatch({ control: timeboxForm.control, name: "title" });
  const taskInput = useWatch({ control: timeboxForm.control, name: "task" });

  useDebounce(
    () => {
      if (!taskInput.title) return;
      refetchSuggesstedTasks({ variables: { keyword: timeboxTitle || taskInput.title } });
    },
    500,
    [timeboxTitle, taskInput.title, refetchSuggesstedTasks],
  );

  const handleSubmit = useCallback(() => {
    const timeboxFormValues = timeboxForm.getValues();

    createTimeboxMutation({
      input: {
        title: timeboxFormValues.title,
        task: {
          title: timeboxFormValues.task.title,
          id: timeboxFormValues.task.id?.toString(),
        },
        startTime: dayjs.fromDateValue(timeboxFormValues.dateRange.start).toISOString(),
        endTime: dayjs.fromDateValue(timeboxFormValues.dateRange.end).toISOString(),
      },
    });
    timeboxForm.reset();
  }, [createTimeboxMutation, timeboxForm]);

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
      <form className="flex flex-col flex-1 gap-y-0.5" onSubmit={timeboxForm.handleSubmit(handleSubmit)}>
        <FormTimeboxTaskInput
          items={suggestedTasks.data?.tasks ?? []}
          control={timeboxForm.control}
          name="task"
          allowsCustomValue
        >
          {(item) => <Item key={item.id}>{item.title}</Item>}
        </FormTimeboxTaskInput>
        {taskInput.id && <input {...timeboxForm.register("title")} placeholder="Title" />}
        <FormDateRangePicker control={timeboxForm.control} name="dateRange" />
        {timeboxForm.formState.isDirty && (
          <button
            className="text-xs leading-normal bg-slate-900 text-white rounded-md py-1 px-2 font-medium w-min"
            type="submit"
          >
            {t("modules.today.components.CreateTimeboxInput.submit")}
          </button>
        )}
      </form>
    </div>
  );
};
