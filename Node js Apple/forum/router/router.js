import express from "express";
// 기존 dirname을 사용하기 위한 세팅
import path from "path";
const root = process.cwd();

const newRouter = (db) => {
  const router = express.Router();

  // 라우터에 메서드들을 추가
  router.get("/", (req, res) => {
    res.render("index.ejs");
  });

  router.get("/about", (req, res) => {
    // path.join은 경로를 그냥 더하지 않고, 상대경로 변환을 해줌
    // 따라서../ 을 하면 상위폴더이동

    // __dirname과 root 둘다 됨
    res.sendFile(path.join(__dirname, "../about.html"));
    // res.sendFile(path.join(root, "about.html"));
  });

  router.get("/list", async (req, res) => {
    let result = await db.collection("post").find().toArray();
    res.render("list.ejs", { post: result }); // 파일 object 대응
  });

  router.get("/time", (req, res) => {
    // ejs파일은views폴더에 넣어야함
    // 동적으로 데이터를 넣을때는 render를 써야함
    res.render("time.ejs", { date: new Date() });
  });

  router.get("/write", (req, res) => {
    res.render("write.ejs");
  });

  router.post("/post", async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).send("제목이나 내용을 입력해주세요");
      return;
    }
    await db.collection("post").insertOne({ title: title, content: content });
    res.status(200).redirect("/list");
  });

  //  메더스가 추가된 라우터를 반환
  return router;
};
export default newRouter;
