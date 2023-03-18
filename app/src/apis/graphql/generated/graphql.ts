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
  title?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  createTimebox: Timebox;
  deleteTask: Scalars['Boolean'];
  deleteTimebox: Scalars['Boolean'];
  updateTask: Task;
  updateTimebox: Timebox;
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
  tasks: Array<Task>;
  timeboxes: Array<Timebox>;
};


export type QueryTimeboxesArgs = {
  endTime?: InputMaybe<Scalars['DateTime']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
};

export type Task = {
  __typename?: 'Task';
  createdAt: Scalars['DateTime'];
  createdById: Maybe<Scalars['String']>;
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

export type Timebox = {
  __typename?: 'Timebox';
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
  endTime?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
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


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, title: string | null, status: TaskStatus | null } };

export type TaskList_TaskFragmentFragment = { __typename?: 'Task', id: string, title: string | null, status: TaskStatus | null };

export type TasksScreenQueryVariables = Exact<{ [key: string]: never; }>;


export type TasksScreenQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: string, title: string | null, status: TaskStatus | null }> };

export type UpdateTaskMutationVariables = Exact<{
  input: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', id: string, title: string | null, status: TaskStatus | null } };

export type UpdateTimeboxMutationVariables = Exact<{
  input: UpdateTimeboxInput;
}>;


export type UpdateTimeboxMutation = { __typename?: 'Mutation', updateTimebox: { __typename?: 'Timebox', id: string } };

export type DeleteTimeboxMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTimeboxMutation = { __typename?: 'Mutation', deleteTimebox: boolean };

export type TodayQueryVariables = Exact<{
  startTime: InputMaybe<Scalars['DateTime']>;
  endTime: InputMaybe<Scalars['DateTime']>;
}>;


export type TodayQuery = { __typename?: 'Query', timeboxes: Array<{ __typename?: 'Timebox', id: string, title: string | null, description: string | null, startTime: any | null, endTime: any | null, task: { __typename?: 'Task', title: string | null, id: string } | null }> };

export type CreateTimeboxMutationVariables = Exact<{
  input: CreateTimeboxInput;
}>;


export type CreateTimeboxMutation = { __typename?: 'Mutation', createTimebox: { __typename?: 'Timebox', id: string } };

export const TaskList_TaskFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskList_TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<TaskList_TaskFragmentFragment, unknown>;
export const SayHelloDocument = {"__meta__":{"hash":"cbc4aa4c16cedd89db9109cbab61a8dc3318dc35"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sayHello"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ping"}}]}}]} as unknown as DocumentNode<SayHelloQuery, SayHelloQueryVariables>;
export const DeleteTaskDocument = {"__meta__":{"hash":"dde75ab7c5fce8ffe17a0846a4cc267efd5beabc"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const CreateTaskDocument = {"__meta__": {"hash":"d5e3ef963f7deada9de9edd6b801e1cf5f2a61fe"}, "kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskList_TaskFragment"}}]}}]}},...TaskList_TaskFragmentFragmentDoc.definitions]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const TasksScreenDocument = {"__meta__": {"hash":"5b11db5e9e1a7238498a6441099390fc61668c45"}, "kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TasksScreen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskList_TaskFragment"}}]}}]}},...TaskList_TaskFragmentFragmentDoc.definitions]} as unknown as DocumentNode<TasksScreenQuery, TasksScreenQueryVariables>;
export const UpdateTaskDocument = {"__meta__": {"hash":"5f697b6f4f64b40059e88e8d61b44303e917cfcc"}, "kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskList_TaskFragment"}}]}}]}},...TaskList_TaskFragmentFragmentDoc.definitions]} as unknown as DocumentNode<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const UpdateTimeboxDocument = {"__meta__":{"hash":"a89bb6495ea5db9fd03fd2521ce259ca18360b3a"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTimebox"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTimeboxInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTimebox"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTimeboxMutation, UpdateTimeboxMutationVariables>;
export const DeleteTimeboxDocument = {"__meta__":{"hash":"ef7bd6f578a50a6bb8f503ba47943f5540d7f072"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTimebox"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTimebox"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTimeboxMutation, DeleteTimeboxMutationVariables>;
export const TodayDocument = {"__meta__":{"hash":"607778322264479aa442f4dc9db07103ca76fc9f"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Today"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeboxes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"startTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"endTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<TodayQuery, TodayQueryVariables>;
export const CreateTimeboxDocument = {"__meta__":{"hash":"c7048b06b4f8447e6b4713af18f6333b5001d477"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTimebox"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTimeboxInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTimebox"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTimeboxMutation, CreateTimeboxMutationVariables>;