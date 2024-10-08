// 1.concrete type or union type
const superPrint = (arr) => {
    arr.forEach((i) => console.log(i));
};
superPrint([1, 2, 3, 4]);
superPrint([true, true, false, true]);
superPrint(["a", "b", 1, true]);
const genericPrint = (arr) => {
    arr.forEach((i) => console.log(i));
};
genericPrint([1, 2, 3, 4]);
genericPrint([1, "a", true, 0.1]);
const genericPrint2 = (arr) => arr[0];
// 5. generic vs any
// 'any'를 사용하는 것은 어떤 타입이든 받을 수 있다는 점에서 'generics'과 같지만
// 함수를 반환하는데 있어 'any'는 받았던 인수들의 타입을 활용하지 못한다
//해당 정보를 잃지 않고 타입에 대한 정보를 다른 쪽으로 전달할 수 있다는 점이 다르다
// generic -> value 에 마우스를 올려보면 타입이 정해져서나온다.
const value = genericPrint2([1, "a", true, 0.1]);
const value2 = genericPrint2([1, 2, 3, 4]);
const value3 = genericPrint2([true, false, true]);
const genericPrint3 = (arr) => arr[0];
const value4 = genericPrint3([1, "a", true, 0.1]);
const value5 = genericPrint3([1, 2, 3, 4]);
const value6 = genericPrint3([true, false, true]);
const genericPrint4 = (arr, b) => [arr[0], b];
const value7 = genericPrint4([1, "a", true, 0.1], "a");
const value8 = genericPrint4([1, 2, 3, 4], 3);
const value9 = genericPrint4([true, false, true], false);
console.log(value7, value8, value9);
// 연산등에 사용시 에러가남
if (value7) {
    console.log(value7);
}
