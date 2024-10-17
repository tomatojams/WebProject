/* 
현재까지 배운 것을 토대로, 아래 함수들에 대한 구현과 함께 호출 시그니처(call signatures) 를 작성해주세요
last(arr): 이 함수는 배열의 마지막 요소를 반환해야 합니다.
prepend(arr, item): 이 함수는 배열의 시작 부분에 item을 넣고 return해야 합니다.
mix(arr,arr) : 두개의 배열을 매개변수로 받아, 매개변수로 받은 두 배열을 하나의 배열로 섞어서 하나의 배열로 반환합니다.
count(arr) : 배열을 매개변수로 받아, 매개변수로 받아온 배열의 길이를 반환하면됩니다.
findIndex(arr, item) : 첫번째 매개변수로 배열을, 두번째 매개변수로 받아온 item이 첫번째 매개변수 
arr배열의 몇번째 index로 존재하는지 체크한후 존재한다면 몇번째 index인지 반환하고 존재하지않는다면 null을 반환합니다.
slice(arr, startIndex, endIndex): 첫번째 매개변수로 배열 arr을 받고, 두번째 매개변수로 숫자 startIndex, 
세번째 매개변수 숫자 endIndex를 받습니다. 첫번째 매개변수 arr을 두번째 매개변수로 받은 startIndex부터 
세번째 매개변수로 받은 인덱스까지 자른 결과를 반환하면됩니다. 이때 세번째 매개변수는 필수 매개변수가 아닙니다.
 */

//1 last(arr): 이 함수는 배열의 마지막 요소를 반환해야 합니다.
type Func1 = {
  <T>(arr: T[]): T;
};

const Last: Func1 = (arr) => arr[arr.length - 1];

// 2 prepend(arr, item): 이 함수는 배열의 시작 부분에 item을 넣고 return해야 합니다.

type Func2 = {
  <T>(arr: T[], b: T): T[];
};

const Prepend: Func2 = (arr, b) => [b, ...arr];

// 3 mix(arr,arr) : 두개의 배열을 매개변수로 받아, 매개변수로 받은 두 배열을 하나의 배열로 섞어서 하나의 배열로 반환합니다.

type Func3 = {
  <T, V>(arr: T[], brr: V[]): (T | V)[];
};

const Mix: Func3 = (arr, brr) => [...arr, ...brr];

//4  count(arr) : 배열을 매개변수로 받아, 매개변수로 받아온 배열의 길이를 반환하면됩니다.

type Func4 = {
  <T>(arr: T[]): number;
};

const Count: Func4 = (arr) => arr.length;

//5  findIndex(arr, item) : 첫번째 매개변수로 배열을, 두번째 매개변수로 받아온 item이 첫번째 매개변수

type Func5 = {
  <T>(arr: T[], b: number): number | null;
};

const FindIndex: Func5 = (arr, b) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === b) return i;
  }
  return null;
};

/* 6 slice(arr, startIndex, endIndex): 첫번째 매개변수로 배열 arr을 받고, 두번째 매개변수로 숫자 startIndex, 
세번째 매개변수 숫자 endIndex를 받습니다. 첫번째 매개변수 arr을 두번째 매개변수로 받은 startIndex부터 
세번째 매개변수로 받은 인덱스까지 자른 결과를 반환하면됩니다. 이때 세번째 매개변수는 필수 매개변수가 아닙니다. */

type Func6 = {
  <T>(arr: T[], b: number, c?: number): T[];
};

const Slice: Func6 = (arr, startIndex, endIndex) => {
  if (typeof endIndex !== "undefined") {
    return arr.slice(startIndex, endIndex);
  }

  return arr.slice(startIndex);
};
