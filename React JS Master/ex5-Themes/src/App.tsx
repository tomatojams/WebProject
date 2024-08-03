import { useState } from "react";

import styled from "styled-components";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border: 1px solid white;
  background-color: ${(props) => props.theme.bgColor};
  // 원래는 엄격하게 하다가 테마정도라서 타입검사를 엄격하게 안하는듯
`;

// ThemeProvider.d.ts' 파일에서
// export interface DefaultTheme {
//  // [key: string]: any;
// }
//
// 해당 코드를 주석 처리

// node_modules > styled-components > dist> models

const H4 = styled.h4`
  color: ${(props) => props.theme.textColor};
`;

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
      <Box>
        <H4>This is Box</H4>
      </Box>
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          value={value}
          onChange={_onChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
