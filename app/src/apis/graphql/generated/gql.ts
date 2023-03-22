/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query sayHello {\n    ping\n  }\n": types.SayHelloDocument,
    "\n  mutation DeleteTask($id: String!) {\n    deleteTask(id: $id)\n  }\n": types.DeleteTaskDocument,
    "\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      ...TaskList_TaskFragment\n    }\n  }\n": types.CreateTaskDocument,
    "\n  fragment TaskList_TaskFragment on Task {\n    id\n    title\n    status\n  }\n": types.TaskList_TaskFragmentFragmentDoc,
    "\n  query TasksScreen {\n    tasks {\n      ...TaskList_TaskFragment\n    }\n  }\n": types.TasksScreenDocument,
    "\n  mutation UpdateTask($input: UpdateTaskInput!) {\n    updateTask(input: $input) {\n      ...TaskList_TaskFragment\n    }\n  }\n": types.UpdateTaskDocument,
    "\n  mutation UpdateTimebox($input: UpdateTimeboxInput!) {\n    updateTimebox(input: $input) {\n      id\n      title\n      description\n      startTime\n      endTime\n    }\n  }\n": types.UpdateTimeboxDocument,
    "\n  mutation DeleteTimebox($id: String!) {\n    deleteTimebox(id: $id)\n  }\n": types.DeleteTimeboxDocument,
    "\n  query TimeboxesScreen($startTime: DateTime, $endTime: DateTime) {\n    timeboxes(startTime: $startTime, endTime: $endTime) {\n      id\n      title\n      description\n      startTime\n      endTime\n    }\n  }\n": types.TimeboxesScreenDocument,
    "\n  mutation CreateTimebox($input: CreateTimeboxInput!) {\n    createTimebox(input: $input) {\n      id\n      title\n      description\n      startTime\n      endTime\n    }\n  }\n": types.CreateTimeboxDocument,
    "\n  query Today($startTime: DateTime, $endTime: DateTime) {\n    timeboxes(startTime: $startTime, endTime: $endTime) {\n      id\n      title\n      description\n      startTime\n      endTime\n    }\n  }\n": types.TodayDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query sayHello {\n    ping\n  }\n"): (typeof documents)["\n  query sayHello {\n    ping\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTask($id: String!) {\n    deleteTask(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteTask($id: String!) {\n    deleteTask(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      ...TaskList_TaskFragment\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      ...TaskList_TaskFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaskList_TaskFragment on Task {\n    id\n    title\n    status\n  }\n"): (typeof documents)["\n  fragment TaskList_TaskFragment on Task {\n    id\n    title\n    status\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TasksScreen {\n    tasks {\n      ...TaskList_TaskFragment\n    }\n  }\n"): (typeof documents)["\n  query TasksScreen {\n    tasks {\n      ...TaskList_TaskFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTask($input: UpdateTaskInput!) {\n    updateTask(input: $input) {\n      ...TaskList_TaskFragment\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTask($input: UpdateTaskInput!) {\n    updateTask(input: $input) {\n      ...TaskList_TaskFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTimebox($input: UpdateTimeboxInput!) {\n    updateTimebox(input: $input) {\n      id\n      title\n      description\n      startTime\n      endTime\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTimebox($input: UpdateTimeboxInput!) {\n    updateTimebox(input: $input) {\n      id\n      title\n      description\n      startTime\n      endTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTimebox($id: String!) {\n    deleteTimebox(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteTimebox($id: String!) {\n    deleteTimebox(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TimeboxesScreen($startTime: DateTime, $endTime: DateTime) {\n    timeboxes(startTime: $startTime, endTime: $endTime) {\n      id\n      title\n      description\n      startTime\n      endTime\n    }\n  }\n"): (typeof documents)["\n  query TimeboxesScreen($startTime: DateTime, $endTime: DateTime) {\n    timeboxes(startTime: $startTime, endTime: $endTime) {\n      id\n      title\n      description\n      startTime\n      endTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTimebox($input: CreateTimeboxInput!) {\n    createTimebox(input: $input) {\n      id\n      title\n      description\n      startTime\n      endTime\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTimebox($input: CreateTimeboxInput!) {\n    createTimebox(input: $input) {\n      id\n      title\n      description\n      startTime\n      endTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Today($startTime: DateTime, $endTime: DateTime) {\n    timeboxes(startTime: $startTime, endTime: $endTime) {\n      id\n      title\n      description\n      startTime\n      endTime\n    }\n  }\n"): (typeof documents)["\n  query Today($startTime: DateTime, $endTime: DateTime) {\n    timeboxes(startTime: $startTime, endTime: $endTime) {\n      id\n      title\n      description\n      startTime\n      endTime\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;