import React from "react";
import type { LoaderFunctionArgs } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

type LoaderFn<T> = (args: LoaderFunctionArgs) => Promise<Response | T>;

export interface Loader<T> extends LoaderFn<T> {
  useData: () => T;
}

export function loader<Result>(fn: LoaderFn<Result>): Loader<Result> {
  return Object.assign(fn, { useData: useLoaderData as () => Result });
}

export interface LoaderScreen<T> extends React.FC {
  loader?: Loader<T | null>;
}
