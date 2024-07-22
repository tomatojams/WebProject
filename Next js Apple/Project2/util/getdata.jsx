import { dbConnection } from "@/util/database";

export default async function handler(req, res) {
  const [rows] = await dbConnection
    .promise()
    .query("SELECT * FROM mart.product");
  // 로직 작성

  res.status(200).json({
    data: rows,
  });
}
