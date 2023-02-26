import dayjs from "dayjs";
import { useMemo } from "react";
import { useQuery } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { TodayQuery, TodayQueryVariables } from "@/apis/graphql/generated/graphql";
import { TimeboxItem } from "@/modules/today/components/TimeboxItem";

const todayScreenQuery = graphql(`
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

export const TodayScreen: React.FC = () => {
  const [todayStart, todayEnd] = useMemo(() => [dayjs().startOf("day"), dayjs().endOf("day")], []);
  const [todayScreen] = useQuery<TodayQuery, TodayQueryVariables>({
    query: todayScreenQuery,
    variables: {
      startTime: todayStart,
      endTime: todayEnd,
    },
  });

  return (
    <div un-p="x-6 y-6" un-h="full" un-w="128" un-border="r slate-200">
      <h1 un-m="b-4" un-text="3xl" un-font="semibold">
        Today
      </h1>
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
