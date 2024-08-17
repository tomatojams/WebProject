// Q1

/* 1. 간단한 메소드 만들기

  */
var man = {
  name: "토마토",

  sayHi: function () {
    console.log(`안녕 나는 ${this.name}이야`);
  },
};

man.sayHi();

// Q2

/* 2. 오브젝트 내의 데이터를 전부 더해주는 메소드만들기  */


var data = {
  data: [1, 2, 3, 4, 5],
};

let total = 0;
data.data.forEach((a) => {
  total = total + a;
});
console.log(total);

//Q3
