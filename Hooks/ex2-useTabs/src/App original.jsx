import { useState } from "react";
import "./styles.css";

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

const useTabs = (initialTab, allTabs) => {
  const [currentIdx, setCurrentIdx] = useState(initialTab);

  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }

  return { currentItem: allTabs[currentIdx], changeItem: setCurrentIdx };
};

export default function App() {
  const { currentItem, changeItem } = useTabs(0, content);
  return (
    <div className="App">

      {content.map((section, index) => (
        <button key={index} onClick={() => changeItem(index)}>
          {section.tab}
        </button>
        // ()=> 로 반드시 해야함
      ))}
      <br />
      <div>{currentItem.content}</div>
    </div>
  );
}
