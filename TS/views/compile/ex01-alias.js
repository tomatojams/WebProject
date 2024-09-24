var player = {
    name: "tomato",
    age: 21
};
var tomato1 = {
    name: "jams"
};
//3. union에서 undefined가있을 경우 if등에서 undefined일수있는 경우 존재여부부터 명시
if (player.age && player.age < 10) {
}
//4. 매개변수에도 타입지정 가능,
function playerMaker(name) {
    return {
        name: name
    };
}
// 5. 리턴타입없으면 에러남
var jams = playerMaker("jams");
jams.age = 12;
//6.  리턴타입 명시 -> 함수 자체에 타입명시하는것과 같음
function playerMaker2(name) {
    return {
        name: name
    };
}
var jams2 = playerMaker2("jams");
jams2.age = 12;
//7. 상수형 함수 타입지정, 매개변수 뒤에:
var playerMaker3 = function (name) { return ({ name: name }); };
