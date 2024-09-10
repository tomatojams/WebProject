//Q1
function name3(x) {
    if (x !== undefined) {
        console.log(`안녕하세요 ${x}`);
    }
    else {
        console.log("이름이 없어요.");
    }
}
name3("김지한");
name3();
//Q2
function counta(x) {
    return x.toString().replace("-", "").length;
}
console.log(counta(1234));
//Q3
var level;
(function (level) {
    level[level["high"] = 0] = "high";
    level[level["middle"] = 1] = "middle";
    level[level["low"] = 2] = "low";
})(level || (level = {}));
function est(x, y, z) {
    let total = 0;
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
