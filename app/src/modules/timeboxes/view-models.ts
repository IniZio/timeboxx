export interface TimeboxItemTimebox {
  id: string;
  title?: Maybe<string>;
  description?: Maybe<string>;
  startTime?: Maybe<Date>;
  endTime?: Maybe<Date>;
}

export interface TimeboxDetailTimebox {
  id: string;
  task?: Maybe<TimeboxDetailTask>;
  title?: Maybe<string>;
  description?: Maybe<string>;
  startTime?: Maybe<Date>;
  endTime?: Maybe<Date>;
}

export interface TimeboxDetailTask {
  id: string;
  title?: Maybe<string>;
}
