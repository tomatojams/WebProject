$("button:nth-child(odd)").click(a);
$("button:nth-child(even)").click(() => {
    $("body").css("background-color", "blue");
});

// 익명함수 자리에 넣을 수 있는 것
// 1. function() { }
// 2.()=> { }
// 3. 함수 이름만 적음
// 즉 함수만 호출하라고할때는 패러미터없는 익명함수 자리이고
// 함수를 불러 리턴값을 받을때는 패러미터가있는 경우로 다름
function a() {
    $("body").css("background-color", "red");
}

function b() {
    $("body").css("background-color", "blue");
}
