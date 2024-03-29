import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { TodayQuery, TodayQueryVariables } from "@/apis/graphql/generated/graphql";
import { CreateTimeboxInput } from "@/modules/timeboxes/components/CreateTimeboxInput";
import { TimeboxDetail } from "@/modules/timeboxes/components/TimeboxDetail";
import { TimeboxItem } from "@/modules/timeboxes/components/TimeboxItem";
import { TimeboxDetailTimebox, TimeboxItemTimebox } from "@/modules/timeboxes/view-models";

export const TodayScreenQuery = graphql(`
  query Today($startTime: DateTime, $endTime: DateTime) {
    timeboxes(startTime: $startTime, endTime: $endTime) {
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

export const TodayScreen: React.FC = () => {
  const { t } = useTranslation();

  const [todayStart, todayEnd] = useMemo(() => [dayjs().startOf("day"), dayjs().endOf("day")], []);
  const [todayScreen] = useQuery<TodayQuery, TodayQueryVariables>({
    query: TodayScreenQuery,
    variables: {
      startTime: todayStart,
      endTime: todayEnd,
    },
    requestPolicy: "cache-and-network",
  });

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
        <h1 un-m="b-4" un-text="3xl" un-font="semibold" className="text-gray-700">
          {t("modules.today.title")}
        </h1>
        <CreateTimeboxInput className="w-full mb-2.5" />
        {todayScreen.fetching && !todayScreen.stale ? (
          "Loading..."
        ) : (
          <div>
            {todayScreen.data?.timeboxes.map((timebox) => (
              <TimeboxItem
                key={timebox.id}
                timebox={timebox}
                onClick={handleClickTimeboxItem}
                isActive={focusedTimebox?.id === timebox.id}
              />
            ))}
          </div>
        )}
      </div>
      {!!focusedTimebox && <TimeboxDetail timebox={focusedTimebox} onDelete={handleTimeboxDeleted} />}
    </div>
  );
};
