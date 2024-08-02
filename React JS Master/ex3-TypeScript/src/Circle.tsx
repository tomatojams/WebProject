import styled from "styled-components";

// styled 컴포넌트 선언시에 interface 명시
const Container = styled.div<CircleProps>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-color: ${(props) => props.bgColor};
  border: 2px solid ${(props) => props.borderColor};
  border-radius: 50%;
`;

// 파이썬의 basemodel 과 같음

// 타입을 선언
interface CircleProps {
  // required
  bgColor: string;
  size: string;
  // optional
  borderColor?: string;
  // borderColor: string | undefined;
  text?: string;
}

// 함수에 매개변수 오브젝트 interface 예시
interface playerShape {
  name: string;
  age: string;
}

// 함수선언시 타입지정
const sayHello = (playerObj: playerShape) =>
  `${playerObj.name}, you're ${playerObj.age} years old`;

// 파이썬의 타입힌트 모델과같음

// 1. 함수를 선언할때 interface 방식
export default function Circle({
  size,
  bgColor,
  borderColor,
  text = "default text", // 디펄트값을 함수선언 object 안에서 설정할수있음
}: CircleProps) {
  return (
    <div>
      {
        // 2. 함수를 호출할때 object로 받아야함
        sayHello({ name: "tomato", age: "29" })
      }

      <Container
        // 3. 컴포넌트 호출할때 props 방식
        size={size}
        bgColor={bgColor}
        // 컴포넌트 호출할때  default 값 설정이 가능하다.
        borderColor={borderColor ?? "pink"}>
        {text}
      </Container>
    </div>
  );
}
