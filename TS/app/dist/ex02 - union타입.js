// union 타입
var clubmember = [1, "2", 3];
var object = { a: "123" };
// any
var name1;
// unknown
var name2;
name2 = 123;
name2 = {};
// unknown은 에러를 발생시켜줌
var var1 = name2;
// any는 에러 발생이 안됨.
var1 = name1;
// unknown은 연산에서 에러 발생시켜줌
name2 - 1;
// string + 1  (가능)
// mumber + 1은 (가능)
// string | number +1 (에러)
// union 타입은 에러가 남
var age;
age + 1;
// number 타입이 아니라서 연산이 안됨
var age2 = 1;
age2 - 1;
//Q1
// let user = 'kim';
// let age = undefined;
// let married = false; 
// let 철수 = [user, age, married];
var user = "kim";
var age3 = undefined;
var married = false;
var hi = [user, age3, married];
var school1 = {
    score: [100, 97, 84],
    teacher: "phil",
    friend: "John"
};
school1.score[4] = false;
school1.friend = ["Lee", school1.teacher];
