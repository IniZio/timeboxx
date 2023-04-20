import { KeyingConfig } from "@urql/exchange-graphcache";

import { Task, Timebox, Timeslot } from "@/apis/graphql/generated/graphql";

export const keys = {
  Timebox: (data: Timebox) => data.id,
  Task: (data: Task) => data.id,
  Timeslot: (data: Timeslot) => data.id,
} as KeyingConfig;
