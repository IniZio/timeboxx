import { KeyingConfig } from "@urql/exchange-graphcache";

import { Task } from "@/apis/graphql/generated/graphql";

export const keys = {
  Task: (data: Task) => data.id,
} as KeyingConfig;
