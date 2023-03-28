import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";
import { RangeValue } from "@react-types/shared";
import dayjs from "dayjs";
import { t } from "i18next";
import { Bin } from "iconoir-react";
import { Key, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Item } from "react-stately";
import { useDebounce } from "react-use";
import { useMutation, useQuery } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { FormComboBox } from "@/components/form/FormComboBox";
import { FormDateRangePicker } from "@/components/form/FormDateRangePicker";
import { TimeboxDetailTimebox } from "@/modules/timeboxes/view-models";
import { cn } from "@/utils";

export interface TimeboxDetailProps {
  className?: string;
  children?: React.ReactNode;
  timebox: TimeboxDetailTimebox;
  onDelete?: (id: string) => void;
}

export const SuggestTasksQuery = graphql(`
  query SuggestTasks($keyword: String) {
    tasks(keyword: $keyword) {
      id
      title
    }
  }
`);

const UpdateTimeboxMutation = graphql(`
  mutation UpdateTimebox($input: UpdateTimeboxInput!) {
    updateTimebox(input: $input) {
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

const DeleteTimeboxMutation = graphql(`
  mutation DeleteTimebox($id: String!) {
    deleteTimebox(id: $id)
  }
`);

type TimeboxForm = {
  task: { key: Maybe<Key>; input: Maybe<string> };
  title: Maybe<string>;
  dateRange: RangeValue<DateValue>;
};

export const TimeboxDetail: React.FC<TimeboxDetailProps> = ({ className, timebox, onDelete }) => {
  const [suggestedTasks, refetchSuggesstedTasks] = useQuery({
    query: SuggestTasksQuery,
    requestPolicy: "cache-and-network",
    pause: true,
  });
  const [_, updateTimeboxMutation] = useMutation(UpdateTimeboxMutation);
  const [__, deleteTimeboxMutation] = useMutation(DeleteTimeboxMutation);

  const timeboxForm = useForm<TimeboxForm>({
    values: {
      task: { key: timebox.task?.id, input: timebox.task?.title },
      title: timebox.title,
      dateRange: {
        start: parseAbsoluteToLocal(dayjs(timebox.startTime).toISOString()),
        end: parseAbsoluteToLocal(dayjs(timebox.endTime).toISOString()),
      },
    },
  });

  const handleDeleteTimebox = useCallback(() => {
    deleteTimeboxMutation({ id: timebox.id }).then(() => onDelete?.(timebox.id));
  }, [deleteTimeboxMutation, onDelete, timebox.id]);

  const timeboxFormValues = useWatch(timeboxForm) as unknown as TimeboxForm;
  useDebounce(
    () => {
      if (!timeboxFormValues.task?.input) return;
      refetchSuggesstedTasks({ variables: { keyword: timeboxFormValues.task?.input } });
    },
    500,
    [timeboxFormValues.task?.input, refetchSuggesstedTasks],
  );
  useDebounce(
    () => {
      if (!timeboxForm.formState.isDirty) {
        return;
      }

      updateTimeboxMutation({
        input: {
          id: timebox.id,
          task: { id: timeboxFormValues.task.key?.toString() },
          title: timeboxFormValues.title,
          startTime: timeboxFormValues.dateRange?.start?.toDate?.(""),
          endTime: timeboxFormValues.dateRange?.end?.toDate?.(""),
        },
      });

      timeboxForm.reset(undefined, { keepValues: true });
    },
    1000,
    [
      timebox,
      timeboxForm,
      timeboxFormValues.dateRange,
      timeboxFormValues.task.key,
      timeboxFormValues.title,
      updateTimeboxMutation,
    ],
  );

  return (
    <div className={cn(className, "p-6 flex-1")}>
      <div className="flex">
        <input className="text-gray-900 leading-7 flex-1 text-lg" {...timeboxForm.register("title")} />
        <Bin width={18} height={18} className="text-red cursor-pointer" onClick={handleDeleteTimebox} />
      </div>
      <div className="gap-2 my-4">
        <div className="flex items-center">
          <p className="leading-7 text-sm text-gray-500 w-32">{t("modules.timeboxes.components.TimeboxDetail.time")}</p>
          <FormDateRangePicker control={timeboxForm.control} name="dateRange" />
        </div>
        <div className="flex items-center">
          <p className="leading-7 text-sm text-gray-500 w-32">{t("modules.timeboxes.components.TimeboxDetail.task")}</p>
          <FormComboBox control={timeboxForm.control} name="task" items={suggestedTasks.data?.tasks ?? []}>
            {(item) => <Item key={item.id}>{item.title}</Item>}
          </FormComboBox>
        </div>
      </div>
    </div>
  );
};
