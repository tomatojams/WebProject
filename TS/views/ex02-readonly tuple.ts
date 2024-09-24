// 1. readonly 변경불가능 const와 차이점은 const는 push등이 가능

type Player2 = {
  readonly name: string;
  age?: number;
};

// 2. const는 추가가능
const numbers1 = [1, 2, 3, 4];
numbers1.push(5);
console.log("const numbers1:", numbers1);

// 3. readonly는 추가도 에러처리-> js로 컴파일하면 실제로는 실행되고 개발과정에서 에러를 내줌
const numbers: readonly number[] = [1, 2, 3, 4];

numbers.push(5);

console.log("readonly number", numbers);

// 4. tuple 정해진 형식의 array
["tomato", 12, true];

const player3: [string, number, boolean] = ["tomato", 12, true];
player3[0] = 1;
player3[1] = 10;
