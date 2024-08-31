import { useState } from "react";

export default function App() {
  const [title, setTitle] = useState(["남자코트 추천", "강남 우동맛집", "파이썬 독학"]);
  const [number, setNumber] = useState(0);
  const [showIndex, setShowIndex] = useState("");
  const [modal, setModal] = useState(false);
  // 가나다순 정열
  const onSet = () => {
    let set = [...title];
    set.sort();
    setTitle(set);
  };
  // 증가함수
  const onPlus = () => {
    setNumber((prev) => prev + 1);
  };
  // 배열변경
  const change = () => {
    let 복사 = [...title];
    복사[0] = "여자코트 추천";
    setTitle(복사);
  };

  function _onShow(index: any) {
    setShowIndex(index);
    setModal((prev) => !prev);
  }
  return (
    <div className="App">
      <div className="black-nav">
        <div>
          개발 blog
          <span style={{ cursor: "pointer" }} onClick={onSet}>
            🔠
          </span>
          <span onClick={change}>여자</span>
        </div>
      </div>

      {title.map((item, index) => (
        <div className="list list-article" key={index}>
          <h4>
            <span onClick={() => _onShow(index)}>{item}</span>
            <span style={{ cursor: "pointer" }} onClick={onPlus}>
              🥑
            </span>{" "}
            {number}
          </h4>
          <p>2월 17일 발행</p>
        </div>
      ))}
      {modal ? <Modal /> : null}
    </div>
  );
}

function Modal() {
  return (
    <div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}
