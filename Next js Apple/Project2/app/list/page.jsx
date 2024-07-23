import { initDbConnection } from "@/util/databaseMysql";
import Link from "next/link";
import WriteButton from "./WriteButton";
import styles from "@/app/page.module.css";

export default async function List() {
  // DB연결
  let db = await initDbConnection(); // await 순차적으로 동작하게 강제함
  const [rows] = await db.query(
    "SELECT * FROM forum.post order by datetime DESC"
  );

  // console.log(rows);

  function _timeTodate(datetime) {
    const month = String(datetime.getMonth() + 1).padStart(2, "0");
    const date = String(datetime.getDate()).padStart(2, "0");
    const hour = String(datetime.getHours()).padStart(2, "0");
    const minute = String(datetime.getMinutes()).padStart(2, "0");
    return `${month}월 ${date}일 ${hour}시 ${minute}분`;
  }

  return (
    <div className="list-bg">
      <h3>게시판</h3>
      <div className={styles.post}>
        {rows.map((item, index) => {
          // return 없애면 중괄호도 없애야 함
          return (
            <div key={index} className={styles.list_item}>
              <article className={styles.article}>
                <Link
                  href={
                    // ***다이나믹 라우팅***
                    "/detail/" + item._id.toString()
                  }>
                  <span className={styles.title}>{item.title}</span>
                </Link>

                <span className={styles.span}>
                  {_timeTodate(item.datetime)}
                </span>
              </article>
              <hr className={styles.hr} />
            </div>
          );
        })}
      </div>

      <WriteButton />
    </div>
  );
}
