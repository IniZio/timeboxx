import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "urql";

import { graphql } from "@/apis/graphql/generated";
import { Button } from "@/components/Button";
import { DateRangePicker } from "@/components/DateRangePicker";
import { RangeValue } from "@/components/react-aria";
import { CreateTimeboxInput, CreateTimeboxInputProps } from "@/modules/timeboxes/components/CreateTimeboxInput";
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
  const [_, createTimeboxMutation] = useMutation(CreateTimeboxMutation);

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
          <h1 un-text="3xl" un-font="semibold" className="flex-1">
            {t("modules.timeboxes.title")}
          </h1>

          {notThisWeek && <Button onPress={resetDateRange}>{t("modules.timeboxes.today")}</Button>}
          <DateRangePicker value={dateRange} onChange={setDateRange} granularity="day" />
        </div>

        <CreateTimeboxInput className="mx-6 mb-2.5" onSubmit={handleSubmitCreateTimebox} />

        {timeboxesScreen.fetching && !timeboxesScreen.stale ? (
          "Loading..."
        ) : (
          <div>
            {Array.from(Array(numofDays).keys()).map((dayOffset) => {
              const day = dayjs.fromDateValue(dateRange.start).add(dayOffset, "days");
              const timeboxes = timeboxesScreen.data?.timeboxes.filter((t) =>
                day.isBetween(dayjs(t.startTime), dayjs(t.endTime), "day", "[]"),
              );

              return (
                <div key={dayOffset}>
                  <div className="flex items-center">
                    <h3 className="mx-6 text-base text-gray-900 font-semibold leading-tight my-2">
                      {day.isToday() ? "Today" : day.format("dddd, D")}
                    </h3>
                  </div>
                  <div className="mx-6">
                    {timeboxes?.length ? (
                      timeboxes?.map((timebox) => (
                        <TimeboxItem key={timebox.id} timebox={timebox} onClick={handleClickTimeboxItem} />
                      ))
                    ) : (
                      <p className="italic">Nothing planned.</p>
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
