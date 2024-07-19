import { useState } from "react";

const content = [
  {
    tab: "section1",
    content: "I'm the content of the section 1",
  },
  {
    tab: "section2",
    content: "I'm the content of the section 2",
  },
];

const TabToContent = (initialTab, allContent) => {
  // 1. 리액트 컴포넌트는 반드시 대문자로 시작
  const [currentIdx, setCurrentIdx] = useState(initialTab);
  if (!allContent || !Array.isArray(allContent)) {
    return;
  }
    return { section: allContent[currentIdx], changeItem: setCurrentIdx };
    // 2. return은 별칭으로 
};

export default function App() { // 3.  App은 function으로 
    const { section, changeItem } = TabToContent(0, content);
    // 커스텀 훅을 만들어서 내용과, 변경함수를 리턴

  return (
    <>
      {content.map((item, index) => ( // 4. 변수앞에 { 반드시
          <button onClick={() => changeItem(index)} key={index}
          // 5.  ()=>로 클릭시 작동하게함
          >
          {item.tab}
        </button>
      ))}
      <div>{section.content}</div> 
    </>
  );
}
