import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";
import { RangeValue } from "@react-types/shared";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { Button } from "@/components/Button";
import { DateRangePicker } from "@/components/DateRangePicker";
import { CreateTimeboxInput } from "@/modules/timeboxes/components/CreateTimeboxInput";
import { TimeboxDetail } from "@/modules/timeboxes/components/TimeboxDetail";
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

const getInitialDateRange = () => ({
  start: parseAbsoluteToLocal(dayjs().startOf("week").toISOString()),
  end: parseAbsoluteToLocal(dayjs().endOf("week").toISOString()),
});

export const TimeboxesScreen: React.FC<TimeboxesScreenProps> = () => {
  const { t } = useTranslation();

  const [dateRange, setDateRange] = useState<RangeValue<DateValue>>(getInitialDateRange);
  const notThisWeek = useMemo(
    () => !dayjs.fromDateValue(dateRange.start).isSame(new Date(), "week"),
    [dateRange.start],
  );
  const resetDateRange = useCallback(() => setDateRange(getInitialDateRange()), []);

  const numofDays = useMemo(
    () => dayjs.fromDateValue(dateRange.end).diff(dayjs.fromDateValue(dateRange.start), "days"),
    [dateRange.end, dateRange.start],
  );

  const [timeboxesScreen] = useQuery({
    query: TimeboxesScreenQuery,
    variables: {
      startTime: dayjs.fromDateValue(dateRange.start),
      endTime: dayjs.fromDateValue(dateRange.end),
    },
    requestPolicy: "cache-and-network",
  });

  const [focusedTimebox, setFocusedTimebox] = useState<TimeboxDetailTimebox>();
  const handleClickTimeboxItem = useCallback(
    (focused: TimeboxItemTimebox) => {
      setFocusedTimebox(timeboxesScreen.data?.timeboxes.find((t) => t.id === focused.id));
    },
    [timeboxesScreen.data?.timeboxes],
  );
  const handleTimeboxDeleted = useCallback(() => {
    setFocusedTimebox(undefined);
  }, []);

  return (
    <div className="flex w-full h-full">
      <div un-p="t-6" un-h="full" className="flex flex-col min-w-0 w-128 border-r border-slate-200">
        <div className="flex items-center mb-4 mx-6">
          <h1 un-text="3xl" un-font="semibold" className="flex-1 text-gray-700">
            {t("modules.timeboxes.title")}
          </h1>

          {notThisWeek && <Button onPress={resetDateRange}>{t("modules.timeboxes.today")}</Button>}
          <DateRangePicker value={dateRange} onChange={setDateRange} granularity="day" />
        </div>

        <CreateTimeboxInput className="mx-6 mb-2.5" />

        {timeboxesScreen.fetching && !timeboxesScreen.stale ? (
          "Loading..."
        ) : (
          <div className="overflow-y-auto">
            {Array.from(Array(numofDays).keys()).map((dayOffset) => {
              const day = dayjs.fromDateValue(dateRange.start).add(dayOffset, "days");
              const timeboxes = timeboxesScreen.data?.timeboxes.filter((t) =>
                day.isBetween(dayjs(t.startTime), dayjs(t.endTime), "day", "[]"),
              );

              return (
                <div key={dayOffset}>
                  <div className="flex items-center">
                    <h3 className="mx-6 text-gray-900 font-medium text-base leading-tight my-2">
                      {day.isToday() ? "Today" : day.format("dddd, D")}
                    </h3>
                  </div>
                  <div className="mx-6">
                    {timeboxes?.length ? (
                      timeboxes?.map((timebox) => (
                        <TimeboxItem
                          key={timebox.id}
                          timebox={timebox}
                          onClick={handleClickTimeboxItem}
                          isActive={focusedTimebox?.id === timebox.id}
                        />
                      ))
                    ) : (
                      <p className="italic">-</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {!!focusedTimebox && <TimeboxDetail timebox={focusedTimebox} onDelete={handleTimeboxDeleted} />}
    </div>
  );
};
