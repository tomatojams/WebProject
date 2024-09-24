// 1. 타입을 지정해 alias를 만들수있다.
type Age = number;

// 2. union  타입
type Player = {
  name: string;
  age?: Age; // reuse 가능
};

const player: { name: string; age?: number } = {
  name: "tomato",
  age: 21,
};

const tomato1: Player = {
  name: "jams",
};

//3. union에서 undefined가있을 경우 if등에서 undefined일수있는 경우 존재여부부터 명시
if (player.age && player.age < 10) {
}

//4. 매개변수에도 타입지정 가능,
function playerMaker(name: string) {
  return {
    name,
  };
}
// 5. 리턴타입없으면 에러남
const jams = playerMaker("jams");
jams.age = 12;

//6.  리턴타입 명시 -> 함수 자체에 타입명시하는것과 같음
function playerMaker2(name: string): Player {
  return {
    name,
  };
}

const jams2 = playerMaker2("jams");
jams2.age = 12;

//7. 상수형 함수 타입지정, 매개변수 뒤에:
const playerMaker3 = (name: string): Player => ({ name });
