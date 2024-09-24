// 1.concrete type or union type

type SuperPrint = {
  // concrete type
  (arr: number[]): void;
  (arr: boolean[]): void;

  //2. union type 으로 다양한 타입선언
  (arr: (number | boolean | string)[]): void;
};

const superPrint: SuperPrint = (arr) => {
  arr.forEach((i) => console.log(i));
};

superPrint([1, 2, 3, 4]);
superPrint([true, true, false, true]);
superPrint(["a", "b", 1, true]);

// 3. generic
// T는 임의의 타입을 받는다
// 선언시점이아닌, 생성시점에 필요한 call signature 생성
type GenericPrint = {
  <T>(arr: T[]): void;
};

const genericPrint: GenericPrint = (arr) => {
  arr.forEach((i) => console.log(i));
};

genericPrint([1, 2, 3, 4]);
genericPrint([1, "a", true, 0.1]);

// 4. 리턴도 generic

type GenericPrint2 = {
  <Tomato>(arr: Tomato[]): Tomato;
};

const genericPrint2: GenericPrint2 = (arr) => arr[0];

// 5. generic vs any
// 'any'를 사용하는 것은 어떤 타입이든 받을 수 있다는 점에서 'generics'과 같지만
// 함수를 반환하는데 있어 'any'는 받았던 인수들의 타입을 활용하지 못한다
//해당 정보를 잃지 않고 타입에 대한 정보를 다른 쪽으로 전달할 수 있다는 점이 다르다

// generic -> value 에 마우스를 올려보면 타입이 정해져서나온다.
const value = genericPrint2([1, "a", true, 0.1]);
const value2 = genericPrint2([1, 2, 3, 4]);
const value3 = genericPrint2([true, false, true]);

//any -> value에 마우스를 올려보면 타입이 모두 any로 나온다.

type Any = {
  (arr: any[]): any;
};

const genericPrint3: Any = (arr) => arr[0];

const value4 = genericPrint3([1, "a", true, 0.1]);
const value5 = genericPrint3([1, 2, 3, 4]);
const value6 = genericPrint3([true, false, true]);

//6. 2개이상의 generic

// void는 '값을 반환하지 않음'이 아님, 반환한 값을 사용하지 않겠다는 의미
type GenericPrint3 = {
  <T, V>(arr: T[], b: V): void;
};

const genericPrint4: GenericPrint3 = (arr, b) => [arr[0], b];

const value7 = genericPrint4([1, "a", true, 0.1], "a");
const value8 = genericPrint4([1, 2, 3, 4], 3);
const value9 = genericPrint4([true, false, true], false);
console.log(value7, value8, value9);

// 연산등에 사용시 에러가남
if (value7) {
  console.log(value7);
}
