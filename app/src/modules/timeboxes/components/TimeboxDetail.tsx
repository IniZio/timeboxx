import { parseAbsoluteToLocal } from "@internationalized/date";
import dayjs from "dayjs";
import { Bin } from "iconoir-react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useMutation } from "urql";

import { graphql } from "@/apis/graphql/generated";
import {
  DeleteTimeboxMutationVariables,
  UpdateTimeboxInput,
  UpdateTimeboxMutationVariables,
} from "@/apis/graphql/generated/graphql";
import { DateRangePicker } from "@/components/DateRangePicker";
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

export const TimeboxDetail: React.FC<TimeboxDetailProps> = ({ className, timebox, onDelete }) => {
  const [_, updateTimeboxMutation] = useMutation<UpdateTimeboxInput, UpdateTimeboxMutationVariables>(
    UpdateTimeboxMutation,
  );
  const [__, deleteTimeboxMutation] = useMutation<void, DeleteTimeboxMutationVariables>(DeleteTimeboxMutation);

  const [title, setTitle] = useState(() => timebox.title ?? "");
  const handleChangeTitle = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  }, []);

  const [dateRange, setDateRange] = useState(() => ({
    start: parseAbsoluteToLocal(dayjs(timebox.startTime).toISOString()),
    end: parseAbsoluteToLocal(dayjs(timebox.endTime).toISOString()),
  }));

  const handleDeleteTimebox = useCallback(() => {
    deleteTimeboxMutation({ id: timebox.id }).then(() => onDelete?.(timebox.id));
  }, [deleteTimeboxMutation, onDelete, timebox.id]);

  useEffect(() => {
    if (
      timebox.title === title &&
      dayjs(timebox.startTime).isSame(dateRange.start.toDate()) &&
      dayjs(timebox.endTime).isSame(dateRange.end.toDate())
    )
      return;

    updateTimeboxMutation({
      input: {
        id: timebox.id,
        title: title,
        startTime: dateRange.start.toDate(),
        endTime: dateRange.end.toDate(),
      },
    });
  }, [dateRange, timebox.endTime, timebox.id, timebox.startTime, timebox.title, title, updateTimeboxMutation]);

  return (
    <div className={cn(className, "p-6 flex-1")}>
      <div className="flex">
        <input className="flex-1 text-gray-900 leading-7 text-lg" value={title} onChange={handleChangeTitle} />
        <Bin width={18} height={18} className="text-red cursor-pointer" onClick={handleDeleteTimebox} />
      </div>
      <div className="gap-2 my-4">
        <div className="flex items-center">
          <p className="leading-7 text-sm text-gray-500 w-32">Time</p>
          <DateRangePicker value={dateRange} onChange={setDateRange} />
        </div>
      </div>
    </div>
  );
};
