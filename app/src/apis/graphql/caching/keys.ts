import { KeyingConfig } from "@urql/exchange-graphcache";

import { Task, Timebox } from "@/apis/graphql/generated/graphql";

export const keys = {
  Timebox: (data: Timebox) => data.id,
  Task: (data: Task) => data.id,
} as KeyingConfig;
