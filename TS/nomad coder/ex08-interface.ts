// 1.type -> 모든 자료형에 적용해 쓸수있음

type PlayerWithHP = {
  nickname: string;
  healthBar: number;
};
// type은 제한된 문자조합도 사용가능
type Team = "one" | "two" | "three";
// 숫자도 제한가능
type Health = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const tomatos: PlayerWithHP = {
  nickname: "kim",
  healthBar: 99,
};
// type안에 type사용가능
type Member = {
  nickname: string;
  team: Team;
  health: Health;
};

// 2. interface -> 오브젝트 자료형 모양만 결정
interface PlayerWithMP {
  nickname: string;
  manaBar: number;
}

const tomatoss: PlayerWithMP = {
  nickname: "soma",
  manaBar: 99,
};

// 3. interface -> 상속가능

interface Users {
  name: string;
}

interface PlayerWith extends Users {}

const tomato1234: PlayerWith = {
  name: "tomato",
};

//4. implements 로 interface 를 abstract 클래스처럼 활용
// JS로 만들어지지 않고 사라짐
interface Users {
  firstName: string;
  lastName: string;
  fullName(): string;
}

// stack 되어서 name도 구현해야함
class Players implements Users {
  // public으로 해야함
  constructor(
    public name: string,
    public firstName: string,
    public lastName: string
  ) {}

  fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
//new를 안써도됨