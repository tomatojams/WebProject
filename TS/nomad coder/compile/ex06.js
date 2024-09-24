//1. generic in function
// 패러미터앞에 <> 위치
function simplePrint(a, b) {
    return a[0];
}
var value10 = simplePrint([1, "a", true, 0.1], "a");
var value11 = simplePrint([1, 2, 3, 4], 3);
var value12 = simplePrint([true, false, true], false);
