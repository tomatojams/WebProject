const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoURI = process.env.MONGODB_LOCAL;
console.log(mongoURI);
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("mongoose connnected"))
//   .catch((err) => console.log("db connect error", err));

const PORT = 9000;
app.listen(PORT, () => console.log(`server on http://localhost:${PORT}`));

// 주소의 루트폴더를 찾기위한  views 폴더가 어디에 있는지 설정. 앞의 'views'는 키값
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.get("/", (req, res) => {
  res.render("index.html");
});

const mysql = require("mysql2");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "1234",
  database: "forum",
  port: 3307,
});

// 데이터베이스 쿼리를 위한 라우트
app.get("/db", (req, res) => {
  pool.query("SELECT * FROM forum.member", (error, results, fields) => {
    if (error) {
      console.error("쿼리 실행 중 오류 발생:", error);
      res.status(500).send("데이터베이스 쿼리에 실패했습니다.");
      return;
    }
    res.json(results); // 결과가 json이지만 Content-Type: application/json; charset=utf-8 이라서 자동파싱가능
    // res.send(JSON.stringify(results)); // Content-Type: text/html; charset=utf-8 이라서 문자열로 보내짐
  });
});

app.get('api/users/:type', )
