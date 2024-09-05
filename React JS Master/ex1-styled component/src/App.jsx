import styled from "styled-components";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};

  width: 100px;
  height: 100px;
`;


// `` 백틱은 ES6 템플릿 리터럴이 가능한 문자열이라는 의미로
// 문자열내에서 자바스크립트표현식 사용가능
// `${...}`  즉, 템플릿 리터럴은 자바스크립트 코드실행함
// 화살표 함수는 props를 받아 props.bgColor를 반환하는 함수를 나타냄
//  <Box bgColor="tomato">   이 호출되면 props 객체는 는 {bgColor:"tomato"}를 가진다.
// 따라서 props.bgColor = "tomato" 가 됨
// 템플릿 리터널은 자바스크립트 문자열 값을 CSS에 맞게 자동변환해줌.

const Text = styled.span`
  color: white;
`;
// 속성 상속

const Circle = styled(Box)`
  border-radius: 50%;
`;

const Btn = styled.button`
  width: 100px;
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

// atrrs({}) 로 element 미리 속성지정도 가능함

const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: white;
`;

export default function App() {
  return (
    <Frame>
      <Box bgColor="tomato">
        <Text>Hello</Text>
      </Box>
      <Circle bgColor="teal"></Circle>
      <Btn>login</Btn>
      <Btn
        as="a"
        href="#"
        //element 종류를  바꾸려면 as="엘리먼트 태그네임" 하면됨
      >
        link
      </Btn>
      
      <Input />
    </Frame>
  );
}
