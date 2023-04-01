export interface TaskListTask {
  id: string;
  title?: Maybe<string>;
  description?: Maybe<string>;
  deadline?: Maybe<Date>;
}
