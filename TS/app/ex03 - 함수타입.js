// 함수 타입 선언 ():-> 반환하는 타입
function tomatoFunc3(x) {
    return x * 2;
}
tomatoFunc3("3");
let a = tomatoFunc3(3);
function toma(x) {
    return 2;
}
toma();
// 아래둘은 같음
function toma2(x) { }
function toma23(x) { }
toma2();
// ? -> | undefined
function name(x) {
    // 타입이 아직 명확해지지 않았음
    return x * 2;
    //return x!*2
}
export {};
