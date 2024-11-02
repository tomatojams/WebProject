import styled from "styled-components";
import "./global.css";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";

const BigWrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;

  background: #e34336;
  justify-content: center;
  align-items: center;
  padding-bottom: 300px;
  box-sizing: border-box;
`;
const Wrapper = styled(motion.div)`
  height: 50vh;
  width: 100vw;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;
const Circle = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.3);
  height: 150px;
  width: 150px;
  border-radius: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Box = styled(motion.div)`
  box-sizing: border-box;
  // 밀림현상방지
  font-size: 8rem;
  color: #e34336;
  width: 250px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
`;

const StyledIcon = styled(motion.svg)`
  fill: currentColor;
  transform: translateX(5px); // 오른쪽으로 이동
  width: 120px; // 원하는 크기로 설정
  height: 120px;
`;

const Colon = styled(motion.div)`
  font-size: 7rem;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-10%);
`;

export default function App() {
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [clicked, setClicked] = useState(false);
  const _toggle = () => {
    setClicked((prev) => !prev);
  };

  return (
    <>
      <BigWrapper>
        <Wrapper onClick={_toggle}>
          <Box>{minutes}</Box>
          <Colon>
            <span>:</span>
          </Colon>
          <Box>{seconds}</Box>
        </Wrapper>
        <Circle>
          <StyledIcon
            data-slot="icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z"></path>
          </StyledIcon>
        </Circle>
      </BigWrapper>
    </>
  );
}
