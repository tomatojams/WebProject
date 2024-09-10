//Q1
function name3(x?: string) {
  if (x !== undefined) {
    console.log(`안녕하세요 ${x}`);
  } else {
    console.log("이름이 없어요.");
  }
}

name3("김지한");
name3();

//Q2
function counta(x: number): number {
  return x.toString().replace("-", "").length;
}

console.log(counta(1234));

//Q3
enum level {
  "high",
  "middle",
  "low",
}

function est(x: number, y: boolean, z: level): string | void {
  let total: number = 0;

  total += x;

  if (y) {
    total += 500;
  }

  if (z === level.high) {
    total += 100;
  }

  if (total >= 600) {
    return "결혼가능";
  }
}

console.log(est(500, false, level.high));
