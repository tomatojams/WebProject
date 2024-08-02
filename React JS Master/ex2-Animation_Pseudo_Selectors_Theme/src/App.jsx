import styled, { keyframes } from "styled-components";

const Frame = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.backgroundColor};
`;

// CSS와 다르게 순서대로 해야함 rotate 쓰기전에 선언부터
const rotate = keyframes`
0%{
  transform: rotate(0deg);
border-radius: 0px;
}
50%{
  transform: rotate(360deg);
border-radius: 50%;
}

`;
const Emoji = styled.span`
  font-size: 30px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${rotate} 5s linear infinite; //
  display: flex;
  justify-content: center;
  align-items: center;
  // styled component 처리를 모든 엘리먼트에 할 필요가 없이
  // 자식 엘리먼트는 이런식으로 잡을수있다.
  /* span {
    font-size: 36px;
    transition: 1s ease-in-out;
    &:hover {
      font-size: 70px;
      // 자식엘리먼트를 잡고 상호작용도 설정할 수있다.
    }

    &:active {
      // 계속 클릭하고있는 상태
      opacity: 0;
    }
  } */

  ${Emoji} {
    // script로 선택가능 태그 엘리먼트에 상관없음
    font-size: 36px;
    transition: 1s ease-in-out;
    &:hover {
      font-size: 70px;
      // 자식엘리먼트를 잡고 상호작용도 설정할 수있다.
    }

    &:active {
      // 계속 클릭하고있는 상태
      opacity: 0;
    }
  }
`;
// Apply Theme
const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

export default function App() {
  return (
    <Frame>
      <Box>
        <Title>Good one</Title>
        <Emoji as="p">🤣</Emoji>
        <Emoji>🤣</Emoji>
      </Box>

      <Emoji as="p">🤣</Emoji>
    </Frame>
  );
}
