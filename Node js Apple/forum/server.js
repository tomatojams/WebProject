// 초기세팅
const express = require("express");
const app = express();
const cors = require("cors");
// 아래걸 안하면 못읽어옴
require("dotenv").config();
app.use(cors());
// .css, .js, .jpg 을 static파일이라고 부름, public폴더 지정
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// DB 세팅
const { MongoClient } = require("mongodb");

let db;
const url = process.env.MONGODB_URL;
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("forum");
    // db 연결후에 서버시작이 좋은 방식
    app.listen(9000, () => console.log("Listening on http://localhost:9000"));
  })
  .catch((err) => {
    console.log(err);
  });
// 서버시작

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/news", (req, res) => {
  // db.collection("post").insertOne({ title: "재밌쪄", content:"덥다고 진짜" });
  // res.send("너무 더워");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html");
});

// await 를 지우고 then을 써도 async는 꼭 써야함
app.get("/list", async (req, res) => {
  // 몽고DB는 await 사용을 권장하지만 await 지우고 then을 써도 됨
  let result = await db
    .collection("post")
    .find()
    .toArray()
    .then((result) => {
      console.log(result);
      res.render("list.ejs", { post: result });
    }); // 파일 object 대응
});

app.get("/time", (req, res) => {
  // ejs파일은views폴더에 넣어야함
  // 동적으로 데이터를 넣을때는 render를 써야함
  res.render("time.ejs", { date: new Date() });
});
 