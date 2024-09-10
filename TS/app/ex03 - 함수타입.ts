import { number } from "prop-types";

// 함수 타입 선언 ():-> 반환하는 타입
function tomatoFunc3(x: number): number {
  return x * 2;
}

tomatoFunc3("3");
let a: string = tomatoFunc3(3);

function toma(x: number): void {
  return 2;
}

toma();

// 아래둘은 같음
function toma2(x?: number): void {}
function toma23(x: number | undefined): void {}

toma2();

// ? -> | undefined

function name(x?: number): number {
  // 타입이 아직 명확해지지 않았음
  return x * 2;
  //return x!*2
}
