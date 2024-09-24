// 1. unknown 타입미정
let aa: unknown;

if (typeof aa === "number") {
  let b = aa + 1;
}

if (typeof aa === "string") {
  aa.toUpperCase();
}

// 2. void -> 함수에 대해서 자동지정

function hello() {
  console.log("hello");
}

const a = hello();
a.toUpperCase();

// 3. never
// 에러를 생성할때는 never를 써도 됨
function hello2(): never {
  throw new Error("Error");
}

function hello3(name: string | number) {
  if (typeof name === "string") {
    name;
  } else if (typeof name === "number") {
    name;
  } else {
    return name; // 형식이 never 실행되지 않는다.
  }
}
