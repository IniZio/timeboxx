import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import { useMutation, useQuery } from "urql";

import { graphql } from "@/apis/graphql/generated";
import {
  CreateTimeboxMutationVariables,
  Timebox,
  TodayQuery,
  TodayQueryVariables,
} from "@/apis/graphql/generated/graphql";
import { CreateTimeboxInput, CreateTimeboxInputProps } from "@/modules/today/components/CreateTimeboxInput";
import { TimeboxItem } from "@/modules/today/components/TimeboxItem";

const TodayScreenQuery = graphql(`
  query Today($startTime: DateTime, $endTime: DateTime) {
    timeboxes(startTime: $startTime, endTime: $endTime) {
      id
      title
      description
      startTime
      endTime
      task {
        title
        id
      }
    }
  }
`);

const CreateTimeboxMutation = graphql(`
  mutation CreateTimebox($input: CreateTimeboxInput!) {
    createTimebox(input: $input) {
      id
    }
  }
`);

export const TodayScreen: React.FC = () => {
  const [todayStart, todayEnd] = useMemo(() => [dayjs().startOf("day"), dayjs().endOf("day")], []);
  const [todayScreen, refetchTodayScreen] = useQuery<TodayQuery, TodayQueryVariables>({
    query: TodayScreenQuery,
    variables: {
      startTime: todayStart,
      endTime: todayEnd,
    },
  });

  const [_, createTimeboxMutation] = useMutation<Timebox, CreateTimeboxMutationVariables>(CreateTimeboxMutation);
  const handleSubmitCreateTimebox = useCallback<CreateTimeboxInputProps["onSubmit"]>((value) => {
    createTimeboxMutation({
      input: {
        title: value.title,
        startTime: value.dateRange[0],
        endTime: value.dateRange[1],
      },
    }).then(refetchTodayScreen);
  }, []);

  return (
    <div un-p="x-6 y-6" un-h="full" un-w="128" un-border="r slate-200">
      <h1 un-m="b-4" un-text="3xl" un-font="semibold">
        Today
      </h1>
      <CreateTimeboxInput onSubmit={handleSubmitCreateTimebox} />
      {todayScreen.fetching && !todayScreen.stale ? (
        "Loading..."
      ) : (
        <ul>
          {todayScreen.data?.timeboxes.map((timebox) => (
            <TimeboxItem key={timebox.id} timebox={timebox} />
          ))}
        </ul>
      )}
    </div>
  );
};
