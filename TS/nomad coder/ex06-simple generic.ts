//1. generic in function

import { useState } from "react";

// 패러미터앞에 <> 위치
function simplePrint<V, M>(a: V[], b: M) {
  return a[0];
}
const value10 = simplePrint([1, "a", true, 0.1], "a");
const value11 = simplePrint([1, 2, 3, 4], 3);
const value12 = simplePrint([true, false, true], false);

// 2. type 선언에서 generic

type PlayerGeneric<T> = {
  name: string;
  extraInfo: T;
};

// generic에 object도 넣어도됨
const toamto: PlayerGeneric<{ juicy: string }> = {
  name: "tomato1",
  extraInfo: { juicy: "really" },
};

// 3. generic을 구체화해서 타입을 만들어도됨

type GoodPlayer = PlayerGeneric<{ juicy: string }>;

const toamto2: GoodPlayer = {
  name: "tomato1",
  extraInfo: { juicy: "really" },
};
// 4. generic을 type화 해도 됨 -> 재사용가능

type Extra = { juicy: string };

type GoodPlayer2 = PlayerGeneric<Extra>;

// 5 generic의 용도

type PlayerGeneric4<T> = {
  name: string;
  extraInfo: T; // 타입변동이 있는 항목이 있다면 그걸 generic으로 설정하면됨
};

//6 표준함수 generic
type A = Array<number>; // Array<T> -> 표준라이브러리 따라서 T를 정해줘야함

let num: A = [1, 2, 3, 4];

function printAll(arr: Array<number>) {
  return arr[0];
}

// 7 React
// 훅에서 <T> generic을 설정해서 씀
const [number, setNumber] = useState<number>(0)