import { TimeslotStatus } from "@/apis/graphql/generated/graphql";

export interface TaskListTask {
  id: string;
  title?: Maybe<string>;
  description?: Maybe<string>;
  deadline?: Maybe<string>;
  timeslots?: Maybe<TaskListTaskTimeslot[]>;
}

export interface TaskListTaskTimeslot {
  id: string;
  title?: Maybe<string>;
  startTime?: Maybe<string>;
  endTime?: Maybe<string>;
  duration?: Maybe<number>;
  status?: Maybe<TimeslotStatus>;
}
