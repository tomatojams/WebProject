//1. generic in function
import { useState } from "react";
// 패러미터앞에 <> 위치
function simplePrint(a, b) {
    return a[0];
}
var value10 = simplePrint([1, "a", true, 0.1], "a");
var value11 = simplePrint([1, 2, 3, 4], 3);
var value12 = simplePrint([true, false, true], false);
// generic에 object도 넣어도됨
var toamto = {
    name: "tomato1",
    extraInfo: { juicy: "really" }
};
var toamto2 = {
    name: "tomato1",
    extraInfo: { juicy: "really" }
};
var num = [1, 2, 3, 4];
function printAll(arr) {
    return arr[0];
}
// 7 React
// 훅에서 <T> generic을 설정해서 씀
var _a = useState(0), number = _a[0], setNumber = _a[1];
