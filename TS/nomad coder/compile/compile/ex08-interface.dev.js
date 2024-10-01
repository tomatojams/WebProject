"use strict";

// 1.type -> 모든 자료형에 적용해 쓸수있음
var tomatos = {
  nickname: "kim",
  healthBar: 99
};
var tomatoss = {
  nickname: "soma",
  manaBar: 99
};
var tomato1234 = {
  name: "tomato"
}; // stack 되어서 name도 구현해야함

var Players =
/** @class */
function () {
  // public으로 해야함
  function Players(name, firstName, lastName) {
    this.name = name;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  Players.prototype.fullName = function () {
    return this.firstName + " " + this.lastName;
  };

  return Players;
}(); //new를 안써도됨