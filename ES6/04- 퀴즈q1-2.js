// Q1

/* 1. 간단한 메소드 만들기

  */
let man = {
  name: "토마토",
  // arrow function 사용시 this를 사용할 수 없음.
  sayHi: function () {
    console.log(`안녕 나는 ${this.name}이야`);
  },
};

man.sayHi();

// Q2

/* 2. 오브젝트 내의 데이터를 전부 더해주는 메소드만들기  */


const dataSet = {
  data: [1, 2, 3, 4, 5],

  sum: function () {
    let total = 0;
    this.data.forEach((a) => {
      total = total + a;
    });
    return total;
   }
};

console.log(dataSet.sum()); // 15

//Q3
