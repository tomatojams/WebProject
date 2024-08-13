// 초기세팅
const express = require("express");
const app = express();
const cors = require("cors");
// 아래걸 안하면 못읽어옴
require("dotenv").config();
app.use(cors());
app.use(express.static(__dirname + "/public"));
// DB 세팅
const { MongoClient } = require("mongodb");
let db;
const url = process.env.MONGODB_URL;
// console.log(url);
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("forum");
  })
  .catch((err) => {
    console.log(err);
  });

// 서버시작
app.listen(9000, () => console.log("Listening on http://localhost:9000"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/news", (req, res) => {
  // db.collection("post").insertOne({ title: "재밌쪄" });
  // res.send("너무 더워");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html");
});

app.get("/list", async (req, res) => {
  let result = await db.collection("post").find().toArray();

  console.log(result);
  res.send(result);
});
