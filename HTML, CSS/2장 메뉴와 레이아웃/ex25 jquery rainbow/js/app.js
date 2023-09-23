function chageColors() {
    $("section > div:nth-child(1)").css("background-color", "red");
    $("section > div:nth-child(2)").css("background-color", "orange");
    $("section > div:nth-child(3)").css("background-color", "yellow");
    $("section > div:nth-child(4)").css("background-color", "green");
    $("section > div:nth-child(5)").css("background-color", "blue");
    $("section > div:nth-child(6)").css("background-color", "navy");
    $("section > div:nth-child(7)").css("background-color", "purple");
}
function chageColors2() {
    $("section > div").eq(0).css("background-color", "red");
    $("section > div").eq(1).css("background-color", "orange");
    $("section > div").eq(2).css("background-color", "yellow");
    $("section > div").eq(3).css("background-color", "green");
    $("section > div").eq(4).css("background-color", "blue");
    $("section > div").eq(5).css("background-color", "navy");
    $("section > div").eq(6).css("background-color", "purple");
}

$("button").click(chageColors2);
