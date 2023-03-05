import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useMutation } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { UpdateTimeboxInput, UpdateTimeboxMutationVariables } from "@/apis/graphql/generated/graphql";
import { TimeRangePicker } from "@/components/TimeRangePicker";
import { TimeboxDetailTimebox } from "@/modules/today/view-models";
import { cn } from "@/utils";

export interface TimeboxDetailProps {
  className?: string;
  children?: React.ReactNode;
  timebox: TimeboxDetailTimebox;
}

const UpdateTimeboxMutation = graphql(`
  mutation UpdateTimebox($input: UpdateTimeboxInput!) {
    updateTimebox(input: $input) {
      id
    }
  }
`);

export const TimeboxDetail: React.FC<TimeboxDetailProps> = ({ className, timebox }) => {
  const [_, updateTimeboxMutation] = useMutation<UpdateTimeboxInput, UpdateTimeboxMutationVariables>(
    UpdateTimeboxMutation,
  );

  const [title, setTitle] = useState(() => timebox.title ?? "");
  const handleChangeTitle = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  }, []);

  const [dateRange, setDateRange] = useState<[Maybe<Date>, Maybe<Date>]>(() => [timebox.startTime, timebox.endTime]);
  const handleChangeDateRange = useCallback((value: [Maybe<Date>, Maybe<Date>]) => {
    setDateRange(value);
  }, []);

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
      <input className="text-lg leading-7 text-gray-900" value={title} onChange={handleChangeTitle} />
      <div className="my-4 gap-2">
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
