// 1.문자
let tomato: string = "kim";

//  2.문자 array
let tomatoList: string[] = ["kim", "park"];

// 3.object 옵션
let lemon: { name?: string } = { name: "kim" };

// 4.or
let yellow: string | number = 123;

// 5.type 지정 = 사용 주로 대문자 사용
type Orange = string | number;

// 6.() : -> 리턴타입 명시
function tomatoFunc(x: number): number {
  return x * 2;
}

// 7.tuple
type Member = [number, boolean];
let soma: Member = [1, true];

// 8 . object 일괄 지정 - 문자키속성은 모두 string
type Meet = {
  [key: string]: string;
};

// 9. class
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
