// 1.type -> 모든 자료형에 적용해 쓸수있음
const tomatos = {
    nickname: "kim",
    healthBar: 99,
};
const tomatoss = {
    nickname: "soma",
    manaBar: 99,
};
const tomato1234 = {
    name: "tomato",
};
// stack 되어서 name도 구현해야함
class Players {
    // public으로 해야함
    constructor(name, firstName, lastName) {
        this.name = name;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
//new를 안써도됨
