import { Bin } from "iconoir-react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useMutation } from "urql";

import { graphql } from "@/apis/graphql/generated";
import {
  DeleteTimeboxMutationVariables,
  UpdateTimeboxInput,
  UpdateTimeboxMutationVariables,
} from "@/apis/graphql/generated/graphql";
import { TimeRangePicker } from "@/components/TimeRangePicker";
import { TimeboxDetailTimebox } from "@/modules/today/view-models";
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

  const [dateRange, setDateRange] = useState<[Maybe<Date>, Maybe<Date>]>(() => [timebox.startTime, timebox.endTime]);
  const handleChangeDateRange = useCallback((value: [Maybe<Date>, Maybe<Date>]) => {
    setDateRange(value);
  }, []);

  const handleDeleteTimebox = useCallback(() => {
    deleteTimeboxMutation({ id: timebox.id }).then(() => onDelete?.(timebox.id));
  }, [deleteTimeboxMutation, onDelete, timebox.id]);

  useEffect(() => {
    if (timebox.title === title && timebox.startTime === dateRange[0] && timebox.endTime === dateRange[1]) return;

    updateTimeboxMutation({
      input: {
        id: timebox.id,
        title: title,
        startTime: dateRange[0],
        endTime: dateRange[1],
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
        <div className="flex">
          <p className="leading-7 text-sm text-gray-500 w-32">Time</p>
          <div className="text-sm leading-7 text-gray-900 w-32 flex-1">
            <TimeRangePicker value={dateRange} onChange={handleChangeDateRange} />
          </div>
        </div>
      </div>
    </div>
  );
};
