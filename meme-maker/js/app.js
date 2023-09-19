const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function timefill() {
    ctx.fill();
}


canvas.width = 600;
canvas.height = 600;
ctx.rect(50, 50, 100, 100); //ctx.strokeRect = rect + stroke
ctx.rect(160, 160, 100, 100); //ctx.strokeRect =
ctx.stroke() // ctx.fill()

// bigin new path
ctx.beginPath();
ctx.rect(260, 260, 100, 100);
ctx.fillStyle = "red";
setTimeout(timefill, 3000);
//setTimeout(()=>{ctx.fill();},3000);