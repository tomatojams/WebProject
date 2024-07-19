import "./styles.css";

import { useInput } from "./ussInput";

const App = () => {
  // const maxLen = (value) => value.length <= 10;
  const maxLen = (value) => !value.includes("@");

  const name = useInput("Mr.", maxLen);
  //  함수로 이름으로 지정 해서 함수를 각각 독립저긍로 여러개 사용가능하다.
  // {name.value} 또는 {...name}으로쓸수있음 다만 단일객체를 가져야해서 {...name}은 사용불가
  return (
    <div className="App">
      <h1>Hello </h1>
      <input
        onChange={name.onChange}
        placeholder="Name"
        type="text"
        value={name.value}
      />
    </div>
  );
};

export default App;
