// 타입 좁히기
function tomato2(x) {
    if (typeof x === "number") {
        return x + 1;
    }
    else {
        return x + 1;
    }
}
console.log(tomato2(3));
function tomato3(x) {
    let array = [];
    if (typeof x === "number") {
        array[0] = x;
    }
    else {
        return;
    }
}
// Narrowing 판정
// 속성명 in 오브젝트 자료
// 인스턴스 instanceof 부모
// typeof, in , instanceof
// assertion - as 사용
function tomato12(x) {
    let array = [];
    // 타입 덮어쓰기
    array[0] = x;
}
// 1. Narrowing할때 확정용으로 사용, 변경은 안됨
let namee = "toma";
// namee as number; // 에러남
// 2. 타입에 대해서 100% 확실할때 - 버그를 캐취 못함 (타입을 회피하는거라 if가 더 나음)
//Q1
function clean(array) {
    let result = array.map((item) => {
        if (typeof item === "string") {
            return parseInt(item);
        }
        else {
            return item;
        }
    });
    return result;
}
let result = clean([1, 2, 3, "5", "7", 9]);
console.log(result);
// 다른 방식
function clean2(a) {
    let result = [];
    a.forEach((b) => {
        if (typeof b === "string") {
            result.push(parseFloat(b));
        }
        else {
            result.push(b);
        }
    });
    return result;
}
console.log(clean2([123, "3"]));
//Q2
let t1 = { subject: "math" };
let t2 = { subject: ["science", "english"] };
let t3 = { subject: ["science", "art", "korean"] };
function subject(teacher) {
    if (typeof teacher["subject"] === "string") {
        return teacher.subject;
        // Array 확인방법**
    }
    else if (Array.isArray(teacher.subject)) {
        // 마지막항 지정방법
        return teacher.subject.at(-1);
    }
    else {
        return;
    }
}
console.log(subject(t3));
export {};
