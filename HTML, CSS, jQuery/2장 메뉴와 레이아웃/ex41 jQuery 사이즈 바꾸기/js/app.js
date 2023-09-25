$("nav>section").click(() => {
    revert();
    $("section").css("font-size", "10rem");
    $("nav > section").css("background-color", "pink");
});

$("nav>div").click(() => {
    revert();
    $("div").css("font-size", "10rem");
    $("nav > div").css("background-color", "pink");
});

$("nav>article").click(function () {
    revert();
    $(this).css("font-size", "10rem");
    $(this).css("background-color", "pink");
});

function revert() {
    $("nav > *").css({
        "font-size": "",
        "background-color": "transparent",
    });
}
