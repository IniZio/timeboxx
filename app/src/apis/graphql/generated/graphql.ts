/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreateTaskInput = {
  clientId?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  endTime?: InputMaybe<Scalars['DateTime']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<TaskStatus>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateTimeboxInput = {
  clientId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  endTime?: InputMaybe<Scalars['DateTime']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
  task?: InputMaybe<UpdateTimeboxTaskInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: TaskType;
  createTimebox: TimeboxType;
  deleteTask: Scalars['Boolean'];
  deleteTimebox: Scalars['Boolean'];
  updateTask: TaskType;
  updateTimebox: TimeboxType;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationCreateTimeboxArgs = {
  input: CreateTimeboxInput;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['String'];
};


export type MutationDeleteTimeboxArgs = {
  id: Scalars['String'];
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};


export type MutationUpdateTimeboxArgs = {
  input: UpdateTimeboxInput;
};

export type Query = {
  __typename?: 'Query';
  ping: Scalars['String'];
  tasks: Array<TaskType>;
  timeboxes: Array<TimeboxType>;
};


export type QueryTasksArgs = {
  keyword?: InputMaybe<Scalars['String']>;
};


export type QueryTimeboxesArgs = {
  endTime?: InputMaybe<Scalars['DateTime']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
};

export type Task = {
  __typename?: 'Task';
  clientId: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdById: Maybe<Scalars['String']>;
  deadline: Maybe<Scalars['DateTime']>;
  description: Maybe<Scalars['String']>;
  endTime: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  startTime: Maybe<Scalars['DateTime']>;
  status: Maybe<TaskStatus>;
  timeboxes: TimeboxConnection;
  timeslots: TimeslotConnection;
  title: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  updatedById: Maybe<Scalars['String']>;
};

export enum TaskStatus {
  Backlog = 'BACKLOG',
  Cancelled = 'CANCELLED',
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

export type TaskType = {
  __typename?: 'TaskType';
  createdAt: Scalars['DateTime'];
  createdById: Maybe<Scalars['String']>;
  deadline: Maybe<Scalars['DateTime']>;
  description: Maybe<Scalars['String']>;
  endTime: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  startTime: Maybe<Scalars['DateTime']>;
  status: Maybe<TaskStatus>;
  timeboxes: TimeboxConnection;
  timeslots: TimeslotConnection;
  title: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  updatedById: Maybe<Scalars['String']>;
};

export type Timebox = {
  __typename?: 'Timebox';
  clientId: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdById: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  endTime: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  startTime: Maybe<Scalars['DateTime']>;
  task: Maybe<Task>;
  taskId: Maybe<Scalars['String']>;
  timeslots: TimeslotConnection;
  title: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  updatedById: Maybe<Scalars['String']>;
};

export type TimeboxConnection = {
  __typename?: 'TimeboxConnection';
  edges: Array<TimeboxEdge>;
};

export type TimeboxEdge = {
  __typename?: 'TimeboxEdge';
  node: Timebox;
};

export type TimeboxType = {
  __typename?: 'TimeboxType';
  createdAt: Scalars['DateTime'];
  createdById: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  endTime: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  startTime: Maybe<Scalars['DateTime']>;
  task: Maybe<Task>;
  taskId: Maybe<Scalars['String']>;
  timeslots: TimeslotConnection;
  title: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  updatedById: Maybe<Scalars['String']>;
};

export type Timeslot = {
  __typename?: 'Timeslot';
  clientId: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdById: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  endTime: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  startTime: Scalars['DateTime'];
  task: Maybe<Task>;
  taskId: Maybe<Scalars['String']>;
  timebox: Maybe<Timebox>;
  timeboxId: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  updatedById: Maybe<Scalars['String']>;
};

export type TimeslotConnection = {
  __typename?: 'TimeslotConnection';
  edges: Array<TimeslotEdge>;
};

export type TimeslotEdge = {
  __typename?: 'TimeslotEdge';
  node: Timeslot;
};

export type UpdateTaskInput = {
  clientId?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  dirtyFields?: InputMaybe<Array<Scalars['String']>>;
  endTime?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<TaskStatus>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateTimeboxInput = {
  clientId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  dirtyFields?: InputMaybe<Array<Scalars['String']>>;
  endTime?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
  task?: InputMaybe<UpdateTimeboxTaskInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateTimeboxTaskInput = {
  clientId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type SayHelloQueryVariables = Exact<{ [key: string]: never; }>;


export type SayHelloQuery = { __typename?: 'Query', ping: string };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: boolean };

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'TaskType', id: string, title: string | null, description: string | null, deadline: any | null, status: TaskStatus | null } };

export type TaskList_TaskFragmentFragment = { __typename?: 'TaskType', id: string, title: string | null, description: string | null, deadline: any | null, status: TaskStatus | null };

export type TasksScreenQueryVariables = Exact<{ [key: string]: never; }>;


export type TasksScreenQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'TaskType', id: string, title: string | null, description: string | null, deadline: any | null, status: TaskStatus | null }> };

export type UpdateTaskMutationVariables = Exact<{
  input: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'TaskType', id: string, title: string | null, description: string | null, deadline: any | null, status: TaskStatus | null } };

export type SuggestTasksQueryVariables = Exact<{
  keyword: InputMaybe<Scalars['String']>;
}>;


export type SuggestTasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'TaskType', id: string, title: string | null }> };

export type CreateTimeboxMutationVariables = Exact<{
  input: CreateTimeboxInput;
}>;


export type CreateTimeboxMutation = { __typename?: 'Mutation', createTimebox: { __typename?: 'TimeboxType', id: string, title: string | null, description: string | null, startTime: any | null, endTime: any | null, task: { __typename?: 'Task', id: string, title: string | null } | null } };

export type UpdateTimeboxMutationVariables = Exact<{
  input: UpdateTimeboxInput;
}>;


export type UpdateTimeboxMutation = { __typename?: 'Mutation', updateTimebox: { __typename?: 'TimeboxType', id: string, title: string | null, description: string | null, startTime: any | null, endTime: any | null, task: { __typename?: 'Task', id: string, title: string | null } | null } };

export type DeleteTimeboxMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTimeboxMutation = { __typename?: 'Mutation', deleteTimebox: boolean };

export type TimeboxesScreenQueryVariables = Exact<{
  startTime: InputMaybe<Scalars['DateTime']>;
  endTime: InputMaybe<Scalars['DateTime']>;
}>;


export type TimeboxesScreenQuery = { __typename?: 'Query', timeboxes: Array<{ __typename?: 'TimeboxType', id: string, title: string | null, description: string | null, startTime: any | null, endTime: any | null, task: { __typename?: 'Task', id: string, title: string | null } | null }> };

export type TodayQueryVariables = Exact<{
  startTime: InputMaybe<Scalars['DateTime']>;
  endTime: InputMaybe<Scalars['DateTime']>;
}>;


export type TodayQuery = { __typename?: 'Query', timeboxes: Array<{ __typename?: 'TimeboxType', id: string, title: string | null, description: string | null, startTime: any | null, endTime: any | null, task: { __typename?: 'Task', id: string, title: string | null } | null }> };

export const TaskList_TaskFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskList_TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<TaskList_TaskFragmentFragment, unknown>;
export const SayHelloDocument = {"__meta__":{"hash":"cbc4aa4c16cedd89db9109cbab61a8dc3318dc35"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sayHello"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ping"}}]}}]} as unknown as DocumentNode<SayHelloQuery, SayHelloQueryVariables>;
export const DeleteTaskDocument = {"__meta__":{"hash":"dde75ab7c5fce8ffe17a0846a4cc267efd5beabc"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const CreateTaskDocument = {"__meta__": {"hash":"af8af4ac3be846fd2464d387b86072f7a2549451"}, "kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskList_TaskFragment"}}]}}]}},...TaskList_TaskFragmentFragmentDoc.definitions]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const TasksScreenDocument = {"__meta__": {"hash":"63acd603445122f28cf06ee10642fd1bc155c8d8"}, "kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TasksScreen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskList_TaskFragment"}}]}}]}},...TaskList_TaskFragmentFragmentDoc.definitions]} as unknown as DocumentNode<TasksScreenQuery, TasksScreenQueryVariables>;
export const UpdateTaskDocument = {"__meta__": {"hash":"48a4d2d750684598cf18934ae8603e1038f66684"}, "kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskList_TaskFragment"}}]}}]}},...TaskList_TaskFragmentFragmentDoc.definitions]} as unknown as DocumentNode<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const SuggestTasksDocument = {"__meta__":{"hash":"78e02c39f4156efd181fb213c6ffabafa7f498e3"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SuggestTasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<SuggestTasksQuery, SuggestTasksQueryVariables>;
export const CreateTimeboxDocument = {"__meta__":{"hash":"5591c51bb5d10acb6a5a5c9dd1eda2a3049ffbef"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTimebox"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTimeboxInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTimebox"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}}]}}]} as unknown as DocumentNode<CreateTimeboxMutation, CreateTimeboxMutationVariables>;
export const UpdateTimeboxDocument = {"__meta__":{"hash":"16835b2f598dc3b2db060b289be9b112c0bee055"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTimebox"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTimeboxInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTimebox"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}}]}}]} as unknown as DocumentNode<UpdateTimeboxMutation, UpdateTimeboxMutationVariables>;
export const DeleteTimeboxDocument = {"__meta__":{"hash":"ef7bd6f578a50a6bb8f503ba47943f5540d7f072"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTimebox"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTimebox"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTimeboxMutation, DeleteTimeboxMutationVariables>;
export const TimeboxesScreenDocument = {"__meta__":{"hash":"d4942ac83b76efaacd28b794b26942f63611b39c"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TimeboxesScreen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeboxes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"startTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"endTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}}]}}]} as unknown as DocumentNode<TimeboxesScreenQuery, TimeboxesScreenQueryVariables>;
export const TodayDocument = {"__meta__":{"hash":"607778322264479aa442f4dc9db07103ca76fc9f"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Today"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeboxes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"startTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"endTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}}]}}]} as unknown as DocumentNode<TodayQuery, TodayQueryVariables>;