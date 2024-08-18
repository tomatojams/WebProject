import { useState } from "react";

export default function App() {
  const [글제목, setTitle] = useState(["남자코트 추천", "강남 우동맛집", "파이썬 독학"]);
  const [number, setNumber] = useState(0);
  // 가나다순 정열
  const onSet = () => {
    let set = [...글제목];
    set.sort();
    setTitle(set);
  };
  // 증가함수
  const onPlus = () => {
    setNumber((prev) => prev + 1);
  };
  // 배열변경
  const change = () => {
    let 복사 = [...글제목];
    복사[0] = "여자코트 추천";
    setTitle(복사);
  };
  return (
    <div className="App">
      <div className="black-nav">
        <div>
          개발 blog
          <span style={{ cursor: "pointer" }} onClick={onSet}>
            🔠
          </span>
        </div>
      </div>

      {글제목.map((item, index) => (
        <div key={index} className="list">
          <h4>
            {item}
            <span style={{ cursor: "pointer" }} onClick={onPlus}>
              🥑
            </span>{" "}
            {number}
          </h4>
          <p>2월 17일 발행</p>
        </div>
      ))}
      <div className="modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    </div>
  );
}
