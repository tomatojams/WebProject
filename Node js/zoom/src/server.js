import express from "express";

const app = express();

app.set("view engine", "pug");

app.set("views", __dirname + "/views"); // 절대경로 + 디렉토리에 Pug 템플릿위치(src는 뺌)

app.get("/", (req, res) => res.render("home")); // "/" 경로일때 home.pug  템플릿을 렌더링해서 응답
const handleListen = () => console.log("Listening on http://localhost:3000");

app.listen(3000, handleListen);
