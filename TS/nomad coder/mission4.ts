declare module "lodash" {
  function head<T>(array: T[]): T | undefined;
  function hasIn(object: Object, key: string): boolean;
  function isBoolean<T>(value: T): boolean;
  function toString<T>(value: T): string;
  function split(string: string, separator: RegExp | string, limit?: number): string[];
  function hasPath(object: Object, path: string[] |number[]| string): boolean;
  function filter<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T[];
  function every<T>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => boolean
  ): boolean;
  function map<T, U>(array: T[], iteratee: (value: T, index: number, array: T[]) => U): U[];
}
