//1
type App1 = {
  <T>(arr: T[]): T;
};

const last: App1 = (arr) => {
  return arr[arr.length - 1];
};

//2
type App2 = {
  <T>(arr: T[], b: T): T[];
};

const prepend: App2 = (arr, b) => {
  const reArray = [b, ...arr];
  return reArray;
};

//3
type App3 = {
  <T, M>(arr: T[], brr: M[]): (T | M)[];
};

const mix: App3 = (arr, brr) => {
  return [...arr, ...brr];
};

//4
type App4 = {
  <T>(arr: T[]): number;
};

const count: App4 = (arr) => arr.length;

//5
type App5 = {
  <T>(arr: T[], b: T): number | undefined;
};

const findIndex: App5 = (arr, b) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === b) {
      return i;
    }
  }
  return undefined;
};

//6

type App6 = {
  <T>(arr: T[], start: number, end?: number): T[] | undefined;
};

const slice: App6 = (arr, start, end?) => {
  if (end) {
    return arr.slice(start, end);
  }
  return arr.slice(start);
};
