/* Your task is to translate the JSDoc comments of the following files to Typescript Type Declarations.
여러분들의 목표는 다음 JSDoc 파일들의 주석 부분들을 타입스크립트 타입 정의로 바꾸는 것입니다.
head.js: https://github.com/lodash/lodash/blob/main/src/head.ts
hasIn.js: https://github.com/lodash/lodash/blob/main/src/hasIn.ts
isBoolean.js: https://github.com/lodash/lodash/blob/main/src/isBoolean.ts
toString.js: https://github.com/lodash/lodash/blob/main/src/toString.ts
split.js: https://github.com/lodash/lodash/blob/main/src/split.ts
hasPath.js: https://github.com/lodash/lodash/blob/main/src/hasPath.ts
filter.js: https://github.com/lodash/lodash/blob/main/src/filter.ts
every.js: https://github.com/lodash/lodash/blob/main/src/every.ts
map.js: https://github.com/lodash/lodash/blob/main/src/map.ts
함수를 실행시키는 것까지 하실 필요는 없습니다. 타입 정의만 만드시면 충분합니다.

 */

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
