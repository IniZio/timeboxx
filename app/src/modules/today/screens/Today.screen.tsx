import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery } from "urql";

import { graphql } from "@/apis/graphql/generated";
import {
  CreateTimeboxMutationVariables,
  Timebox,
  TodayQuery,
  TodayQueryVariables,
} from "@/apis/graphql/generated/graphql";
import { CreateTimeboxInput, CreateTimeboxInputProps } from "@/modules/today/components/CreateTimeboxInput";
import { TimeboxDetail } from "@/modules/today/components/TimeboxDetail";
import { TimeboxItem } from "@/modules/today/components/TimeboxItem";
import { TimeboxDetailTimebox, TimeboxItemTimebox } from "@/modules/today/view-models";

export const TodayScreenQuery = graphql(`
  query Today($startTime: DateTime, $endTime: DateTime) {
    timeboxes(startTime: $startTime, endTime: $endTime) {
      id
      title
      description
      startTime
      endTime
    }
  }
`);

const CreateTimeboxMutation = graphql(`
  mutation CreateTimebox($input: CreateTimeboxInput!) {
    createTimebox(input: $input) {
      id
      title
      description
      startTime
      endTime
    }
  }
`);

export const TodayScreen: React.FC = () => {
  const [todayStart, todayEnd] = useMemo(() => [dayjs().startOf("day"), dayjs().endOf("day")], []);
  const [todayScreen] = useQuery<TodayQuery, TodayQueryVariables>({
    query: TodayScreenQuery,
    variables: {
      startTime: todayStart,
      endTime: todayEnd,
    },
    requestPolicy: "cache-and-network",
  });

  const [_, createTimeboxMutation] = useMutation<Timebox, CreateTimeboxMutationVariables>(CreateTimeboxMutation);
  const handleSubmitCreateTimebox = useCallback<CreateTimeboxInputProps["onSubmit"]>(
    (value) => {
      createTimeboxMutation({
        input: {
          title: value.title,
          startTime: value.dateRange[0],
          endTime: value.dateRange[1],
        },
      });
    },
    [createTimeboxMutation],
  );

  const [focusedTimebox, setFocusedTimebox] = useState<TimeboxDetailTimebox>();
  const handleClickTimeboxItem = useCallback(
    (focused: TimeboxItemTimebox) => {
      setFocusedTimebox(todayScreen.data?.timeboxes.find((t) => t.id === focused.id));
    },
    [todayScreen.data?.timeboxes],
  );

  const handleTimeboxDeleted = useCallback(() => {
    setFocusedTimebox(undefined);
  }, []);

  return (
    <div className="flex h-full">
      <div un-p="x-6 y-6" un-h="full" un-w="128" un-border="r slate-200">
        <h1 un-m="b-4" un-text="3xl" un-font="semibold">
          Today
        </h1>
        <CreateTimeboxInput className="mb-2.5" onSubmit={handleSubmitCreateTimebox} />
        {todayScreen.fetching && !todayScreen.stale ? (
          "Loading..."
        ) : (
          <div>
            {todayScreen.data?.timeboxes.map((timebox) => (
              <TimeboxItem key={timebox.id} timebox={timebox} onClick={handleClickTimeboxItem} />
            ))}
          </div>
        )}
      </div>
      {!!focusedTimebox && <TimeboxDetail timebox={focusedTimebox} onDelete={handleTimeboxDeleted} />}
    </div>
  );
};
