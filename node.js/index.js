const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/dog", (req, res) => {
  res.send("<h1>강아지</h1>");
});

app.get("/cat", (req, res) => {
  res.send("고양이");
});

//get방식
// app.get("/user/:id", (req, res) => {
//   // const p = req.params;
//   // console.log(p);
//   const q = req.query;
//   console.log(q);

//   // res.send({ 'message': 'Hello, JavaScript'});
//   res.json({ userId: q.id });
// });

app.get("/user/:id", (req, res) => {
  const p = req.params;
  console.log(p);

  res.send({ 'message': 'Hello, JavaScript'});
});

//POST 방식
// app.use(express.json());
// app.post('/user/:id', (req, res) => {
//   const p = req.params;
//   console.log(p);
//   const b = req.body;
//   console.log(b);

// });

app.get("/sound/:name", (req, res) => {
  const { name } = req.params; // 바로 키값에 밸류가 들어감

  if (name === "dog") {
    res.json({ sound: "멍멍" });
  } else if (name === "cat") {
    res.json({ sound: "야옹" });
  }
});

app.listen(3000);
