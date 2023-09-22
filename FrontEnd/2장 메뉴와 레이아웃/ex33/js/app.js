function a() {
    let div = $("div:nth-of-type(2)");
    div.css("background-color", "yellow");

    $("div:nth-of-type(1)").css("background-color", "red");

    // $은 검색해서나온 배열전부
}

$("button").click(a);
