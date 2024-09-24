// 1. 함수타입 call signature

// type을 활용해 미리 타입을 선언한다
type Add = (a: number, b: number) => number;
// 한수선언 매개변수에 타입명시 안해도됨
const add: Add = (a, b) => a + b;

// 2. overloading
// 하나의 함수가 여러개의 call signature 를 가질때

type Add2 = {
  (a: number, b: number): number;
  (a: number, b: string): number;
};

const add2: Add2 = (a, b) => a + b;

const add3: Add2 = (a, b) => {
  if (typeof b === "string") return a;
  return a + b;
};

// 3. 매개변수의 수가 달라지는 overloading
// 마지막 패러미터가 optional
type Add4 = {
  (a: number, b: number): number;
  (a: number, b: number, c: number): number;
};

// 함수또한 c가 optional이라고 표시를 하고 각각에 대응 로직을 만들어야 함
const add4: Add4 = (a, b, c?: number) => {
  if (c) return a + b + c;
  return a + b;
};
