import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";
import { RangeValue } from "@react-types/shared";
import dayjs from "dayjs";
import { Plus } from "iconoir-react";
import { ChangeEvent, Key, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Item } from "react-stately";
import { useDebounce } from "react-use";
import { useMutation, useQuery } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { DateRangePicker } from "@/components/DateRangePicker";
import { TimeboxTaskInput } from "@/modules/timeboxes/components/TimeboxTaskInput";
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

export const CreateTimeboxInput: React.FC<CreateTimeboxInputProps> = ({ className }) => {
  const { t } = useTranslation();

  const [suggestedTasks, refetchSuggesstedTasks] = useQuery({
    query: SuggestTasksQuery,
    requestPolicy: "cache-and-network",
    pause: true,
  });
  const [_, createTimeboxMutation] = useMutation(CreateTimeboxMutation);

  const [title, setTitle] = useState("");
  const handleChangeTitle = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  }, []);

  const [taskInput, setTaskInput] = useState({
    taskId: "" as Key,
    title: "",
  });

  const [dateRange, setDateRange] = useState<RangeValue<DateValue>>(() => ({
    start: parseAbsoluteToLocal(dayjs().toISOString()),
    end: parseAbsoluteToLocal(dayjs().toISOString()),
  }));

  const setTaskTitle = useCallback((value: string) => {
    setTaskInput((t) => ({ ...t, title: value }));
  }, []);
  useDebounce(
    () => {
      // if (!taskInput.title) return;
      refetchSuggesstedTasks({ variables: { keyword: taskInput.title } });
    },
    500,
    [taskInput.title, refetchSuggesstedTasks],
  );

  const onSelectionChange = useCallback((key: Key) => {
    setTaskInput((t) => ({
      ...t,
      taskId: key,
    }));
  }, []);

  const reset = useCallback(() => {
    setTitle("");
    setTaskInput({ taskId: "", title: "" });
    setDateRange({
      start: parseAbsoluteToLocal(dayjs().toISOString()),
      end: parseAbsoluteToLocal(dayjs().toISOString()),
    });
  }, []);

  const handleSubmit = useCallback(() => {
    createTimeboxMutation({
      input: {
        title,
        task: {
          title: taskInput.title,
          id: String(taskInput.taskId),
        },
        startTime: dayjs.fromDateValue(dateRange.start).toISOString(),
        endTime: dayjs.fromDateValue(dateRange.end).toISOString(),
      },
    });
    reset();
  }, [createTimeboxMutation, dateRange.end, dateRange.start, reset, taskInput.taskId, taskInput.title, title]);

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
      <div className="flex flex-col flex-1 gap-y-0.5">
        <TimeboxTaskInput
          items={suggestedTasks.data?.tasks ?? []}
          inputValue={taskInput.title}
          onInputChange={setTaskTitle}
          onSelectionChange={onSelectionChange}
          // loadingState={suggestedTasks.fetching ? "loading" : "idle"}
          allowsCustomValue
        >
          {(item) => <Item key={item.id}>{item.title}</Item>}
        </TimeboxTaskInput>
        {taskInput.taskId && <input name="title" value={title} onChange={handleChangeTitle} placeholder="Title" />}
        <DateRangePicker value={dateRange} onChange={setDateRange} />
        <button
          className="text-xs leading-normal bg-slate-900 text-white rounded-md py-1 px-2 font-medium w-min"
          onClick={handleSubmit}
        >
          {t("modules.today.components.CreateTimeboxInput.submit")}
        </button>
      </div>
    </div>
  );
};
