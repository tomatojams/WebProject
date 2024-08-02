import { useState } from "react";

export default function App() {
  const [value, setValue] = useState("");
  // <> 제네릭 타입
  const _onChange = (e: React.FormEvent<HTMLInputElement>) => {
    // event 에서 두번을 분해해서 value를 추출해냄
    // = 는 디스트럭쳐링
    const {
      currentTarget: { value },
    } = e;

    setValue(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Hello", value);
  };
  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          value={value}
          onChange={_onChange}
        />
        <button>Log in</button>
      </form>
    </div>
  );
}
