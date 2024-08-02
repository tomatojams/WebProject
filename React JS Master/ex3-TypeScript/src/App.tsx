import Circle from "./Circle";

export default function App() {
  return (
    <div>
      <Circle
        // 4. 컴포넌트 호출할때 style 방식
        size="200px"
        bgColor="teal"
        text="not default text"
      />
      <Circle size="100px" bgColor="wheat" borderColor="violet" />
    </div>
  );
}
