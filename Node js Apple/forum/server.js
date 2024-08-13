const express = require("express");
const app = express();

const handleListen = () => console.log("Listening on http://localhost:8080");

app.listen(8080, handleListen);

app.get("/", (req, res) => res.send("hi~"));

app.get("/news", (req, res) => {
  res.send("너무 더워");
});
