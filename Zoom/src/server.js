import express from "express";
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); // 절대경로 + 디렉토리에 Pug 템플릿위치(src는 뺌)
app.use("/public", express.static(__dirname + "/public")); // 정적파일을 제공하는 미들웨어 함수를 사용

app.get("/", (req, res) => res.render("home")); // "/" 경로일때 home.pug  템플릿을 렌더링해서 응답
const handleListen = () => console.log("Listening on http://localhost:3001");

app.listen(3001, handleListen);
