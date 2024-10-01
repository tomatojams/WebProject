//1. generic in function
import { useState } from "react";
// 패러미터앞에 <> 위치
function simplePrint(a, b) {
    return a[0];
}
const value10 = simplePrint([1, "a", true, 0.1], "a");
const value11 = simplePrint([1, 2, 3, 4], 3);
const value12 = simplePrint([true, false, true], false);
// generic에 object도 넣어도됨
const toamto = {
    name: "tomato1",
    extraInfo: { juicy: "really" },
};
const toamto2 = {
    name: "tomato1",
    extraInfo: { juicy: "really" },
};
let num = [1, 2, 3, 4];
function printAll(arr) {
    return arr[0];
}
// 7 React
// 훅에서 <T> generic을 설정해서 씀
const [number, setNumber] = useState(0);
