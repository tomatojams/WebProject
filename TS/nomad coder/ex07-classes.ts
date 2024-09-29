// abstract class -> 상속을 줄수있지만, 스스로  instance를 만들지못함.
abstract class User {
  constructor(
    // private는 상속해도 접근안됨, instance에서만 됨
    private firstName: string,
    protected lastName: string,
    public nickname: string
  ) {}
  // abstract 메소드 선언 call signatre
  abstract getLastName(): void;

  private getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class PlayerClass extends User {
  getLastName() {
    // 상속했다고해도 private에 접근할수없다.
    console.log(this.lastName);
  }
}

const tomato = new PlayerClass("tomato", "name", "Kim");

tomato.firstName; // 에러로 private를 보호해줌
tomato.nickname;

tomato.getFullName();
