"use strict";

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}(); // abstract class -> 상속을 줄수있지만, 스스로  instance를 만들지못함.


var User =
/** @class */
function () {
  function User( // private는 상속해도 접근안됨, instance에서만 됨
  firstName, lastName, nickname) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.nickname = nickname;
  }

  User.prototype.getFullName = function () {
    return this.firstName + " " + this.lastName;
  };

  return User;
}();

var PlayerClass =
/** @class */
function (_super) {
  __extends(PlayerClass, _super);

  function PlayerClass() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  PlayerClass.prototype.getLastName = function () {
    // 상속했다고해도 private에 접근할수없다.
    console.log(this.lastName);
  };

  return PlayerClass;
}(User);

var tomato = new PlayerClass("tomato", "name", "Kim");
tomato.firstName; // 에러로 private를 보호해줌

tomato.nickname;
tomato.getFullName();