// 초기세팅
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import newRouter from "./router/router.mjs"; // 확장자 포함
import { MongoClient } from "mongodb";
import { json } from "express";
import { urlencoded } from "express";
const root = process.cwd();

dotenv.config();
const app = express();
app.use(cors());
// .css, .js, .jpg 을 static파일이라고 부름, public폴더 지정
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(json());
app.use(urlencoded({ extended: true }));

// DB 세팅

let db;
const url = process.env.MONGODB_URL;
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("forum");

    // 라우터를 함수로 만들어서 db를 주입
    const router = newRouter(db);
    app.use("/", router);

    // db 연결후에 서버시작이 좋은 방식
    app.listen(9000, () => console.log("Listening on http://localhost:9000"));
  })
  .catch((err) => {
    console.log(err);
  });

// 라우터 db 연결없을때
// const router = require("./router/router");

// 라우터 db 연결있음
// const router = require("./router/router")(db);
