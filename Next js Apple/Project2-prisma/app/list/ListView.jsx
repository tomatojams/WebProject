import styles from "@/app/page.module.css";
import Link from "next/link";

export default function ListView({ rows }) {
  // props를 풀어서 받아와야함

  function _timeTodate(datetime) {
    const month = String(datetime.getMonth() + 1).padStart(2, "0");
    const date = String(datetime.getDate()).padStart(2, "0");
    const hour = String(datetime.getHours()).padStart(2, "0");
    const minute = String(datetime.getMinutes()).padStart(2, "0");
    return `${month}월 ${date}일 ${hour}시 ${minute}분`;
  }

  return (
    <div>
      {rows.map((item, index) => {
        // return 없애면 중괄호도 없애야 함
        return (
          <div key={index}>
            <article className="list-article ">
              <Link
                href={
                  // ***다이나믹 라우팅***
                  `/detail/${item.id}`
                }>
                <span className={styles.title}>{item.title}</span>
              </Link>

              <span className={styles.span}>{_timeTodate(item.datetime)}</span>
            </article>
            <hr className="h-line" />
          </div>
        );
      })}
    </div>
  );
}
