import Image from "next/image";
import "./global.css";
// 정적 렌더링 강제
export const dynamic = "force-static";

export default async function Home() {
  // 로직 작성
  // console.log(rows[0]._id);

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
          className="simplebutton">
          Follow us
        </button>
      </form>
    </div>
  );
}
