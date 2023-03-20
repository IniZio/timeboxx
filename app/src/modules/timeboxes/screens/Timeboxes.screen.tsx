import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { TimeboxItem } from "@/modules/timeboxes/components/TimeboxItem";
import { TimeboxDetailTimebox, TimeboxItemTimebox } from "@/modules/timeboxes/view-models";

export interface TimeboxesScreenProps {
  className?: string;
  children?: React.ReactNode;
}

export const TimeboxesScreenQuery = graphql(`
  query TimeboxesScreen($startTime: DateTime, $endTime: DateTime) {
    timeboxes(startTime: $startTime, endTime: $endTime) {
      id
      title
      description
      startTime
      endTime
    }
  }
`);

export const TimeboxesScreen: React.FC<TimeboxesScreenProps> = () => {
  const { t } = useTranslation();

  const [todayStart, sevenDaysLater] = useMemo(() => [dayjs().startOf("day"), dayjs().add(7, "days").endOf("day")], []);
  const [timeboxesScreen] = useQuery({
    query: TimeboxesScreenQuery,
    variables: {
      startTime: todayStart,
      endTime: sevenDaysLater,
    },
    requestPolicy: "cache-and-network",
  });

  const [_focusedTimebox, setFocusedTimebox] = useState<TimeboxDetailTimebox>();
  const handleClickTimeboxItem = useCallback(
    (focused: TimeboxItemTimebox) => {
      setFocusedTimebox(timeboxesScreen.data?.timeboxes.find((t) => t.id === focused.id));
    },
    [timeboxesScreen.data?.timeboxes],
  );

  return (
    <div className="flex w-full h-full">
      <div un-p="t-6" un-h="full" className="flex min-w-0 flex-col">
        <h1 un-m="b-4" un-text="3xl" un-font="semibold" className="px-6">
          {t("modules.timeboxes.title")}
        </h1>

        {timeboxesScreen.fetching && !timeboxesScreen.stale ? (
          "Loading..."
        ) : (
          <div>
            {timeboxesScreen.data?.timeboxes.map((timebox) => (
              <TimeboxItem key={timebox.id} timebox={timebox} onClick={handleClickTimeboxItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
