// 1. 함수타입 call signature
// 한수선언 매개변수에 타입명시 안해도됨
var add = function (a, b) { return a + b; };
var add2 = function (a, b) { return a + b; };
var add3 = function (a, b) {
    if (typeof b === "string")
        return a;
    return a + b;
};
// 함수또한 c가 optional이라고 표시를 하고 각각에 대응 로직을 만들어야 함
var add4 = function (a, b, c) {
    if (c)
        return a + b + c;
    return a + b;
};
