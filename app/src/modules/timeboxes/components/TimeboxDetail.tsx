import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";
import dayjs from "dayjs";
import { Bin } from "iconoir-react";
import { useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDebounce } from "react-use";
import { useMutation } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { FormDateRangePicker } from "@/components/form/FormDateRangePicker";
import { RangeValue } from "@/components/react-aria";
import { TimeboxDetailTimebox } from "@/modules/timeboxes/view-models";
import { cn } from "@/utils";

export interface TimeboxDetailProps {
  className?: string;
  children?: React.ReactNode;
  timebox: TimeboxDetailTimebox;
  onDelete?: (id: string) => void;
}

const UpdateTimeboxMutation = graphql(`
  mutation UpdateTimebox($input: UpdateTimeboxInput!) {
    updateTimebox(input: $input) {
      id
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
  title: Maybe<string>;
  dateRange: RangeValue<DateValue>;
};

export const TimeboxDetail: React.FC<TimeboxDetailProps> = ({ className, timebox, onDelete }) => {
  const [_, updateTimeboxMutation] = useMutation(UpdateTimeboxMutation);
  const [__, deleteTimeboxMutation] = useMutation(DeleteTimeboxMutation);

  const timeboxForm = useForm<TimeboxForm>({
    values: {
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
      if (!timeboxForm.formState.isDirty) {
        return;
      }

      updateTimeboxMutation({
        input: {
          id: timebox.id,
          title: timeboxFormValues.title,
          startTime: timeboxFormValues.dateRange?.start?.toDate?.(""),
          endTime: timeboxFormValues.dateRange?.end?.toDate?.(""),
        },
      });

      timeboxForm.reset(undefined, { keepValues: true });
    },
    1000,
    [timebox, timeboxForm, timeboxFormValues, updateTimeboxMutation],
  );

  return (
    <div className={cn(className, "p-6 flex-1")}>
      <div className="flex">
        <input className="text-gray-900 leading-7 flex-1 text-lg" {...timeboxForm.register("title")} />
        <Bin width={18} height={18} className="text-red cursor-pointer" onClick={handleDeleteTimebox} />
      </div>
      <div className="gap-2 my-4">
        <div className="flex items-center">
          <p className="leading-7 text-sm text-gray-500 w-32">Time</p>
          <FormDateRangePicker control={timeboxForm.control} name="dateRange" />
        </div>
      </div>
    </div>
  );
};
