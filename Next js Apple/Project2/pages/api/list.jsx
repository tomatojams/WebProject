import { initDbConnection } from "@/util/databaseMysql";
export default async function List(req, res) {
  let db = await initDbConnection(); // await 순차적으로 동작하게 강제함
  const [rows] = await db.query("SELECT * FROM forum.post");

  if (req.method === "GET") {
    // console.log("good");
    return res.status(200).json(rows);
  }
}
