// 1. 함수타입 call signature
// 한수선언 매개변수에 타입명시 안해도됨
const add = (a, b) => a + b;
const add2 = (a, b) => a + b;
const add3 = (a, b) => {
    if (typeof b === "string")
        return a;
    return a + b;
};
// 함수또한 c가 optional이라고 표시를 하고 각각에 대응 로직을 만들어야 함
const add4 = (a, b, c) => {
    if (c)
        return a + b + c;
    return a + b;
};
