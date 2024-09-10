// union 타입
let clubmember: (string | number)[] = [1, "2", 3];
let object: { a: string | number } = { a: "123" };
// any
let name1: any;
// unknown

let name2: unknown;

name2 = 123;
name2 = {};

// unknown은 에러를 발생시켜줌
let var1: string = name2;
// any는 에러 발생이 안됨.
var1 = name1;
// unknown은 연산에서 에러 발생시켜줌
name2 - 1;

// string + 1  (가능)
// mumber + 1은 (가능)
// string | number +1 (에러)
// union 타입은 에러가 남
let age: string | number;
age + 1;

// number 타입이 아니라서 연산이 안됨
let age2: unknown = 1;
age2 - 1;

//Q1
// let user = 'kim';
// let age = undefined;
// let married = false; 
// let 철수 = [user, age, married];

let user: string = "kim";
let age3: undefined | number = undefined;
let married: boolean = false;
let hi: (string | undefined | number | boolean)[] = [user, age3, married];

//Q2
// let 학교 = {
//   score : [100, 97, 84],
//   teacher : 'Phil',
//   friend : 'John'
// }
// 학교.score[4] = false;
// 학교.friend = ['Lee' , 학교.teacher]

type school = {
  score: (number | boolean)[];
  teacher: string;
  friend: string | (string | school["teacher"])[];
};

let school1: school = {
  score: [100, 97, 84],
  teacher: "phil",
  friend: "John",
};

school1.score[4] = false;
school1.friend = ["Lee", school1.teacher];
