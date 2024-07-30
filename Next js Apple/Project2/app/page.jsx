import { initDbConnection } from "@/util/databaseMysql";
import styles from "./page.module.css";
import "./global.css";
export default async function Home() {
  let dbConnection = await initDbConnection();

  const [rows] = await dbConnection.query("SELECT * FROM forum.post");

  // 로직 작성
  console.log(rows[0]._id);

  return (
    <div id="mainbox">
      <article className="mainbox_logo">
        {/* <span style={{ fontFamily: "Material Symbols Rounded" }}>gesture</span> */}
        <img style={{ width: "150px" }} src="/images/logo/logocool.svg" />
        <span
          style={{
            fontWeight: "500",
            fontFamily: "Satoshi",
            color: "#aaaaaa",
            fontSize: "14",
          }}>
          Train your happiness
        </span>
      </article>

      <form action="./api/list" method="GET">
        <button
          style={{ fontFamily: "Satoshi", fontSize: "16px", fontWeight: "600" }}
          className="simplebutton"
          type="hidden">
          Follow us
        </button>
      </form>
    </div>
  );
}
