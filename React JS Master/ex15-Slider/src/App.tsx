import styled from "styled-components";
import "./global.css";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";

const BigWrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;

  /* background-color: #de23c2; */
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
  justify-content: center;
  align-items: center;
  padding-bottom: 300px;
  box-sizing: border-box;
`;
const Wrapper = styled(motion.div)`
  height: 50vh;
  width: 100vw;
  display: flex;

  justify-content: center;
  align-items: center;
  padding-bottom: 300px;
  box-sizing: border-box;
`;

const Box = styled(motion.div)`
  box-sizing: border-box;
  // 밀림현상방지
  position: absolute;
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
`;

// Variants를 함수형으로 만들수있다.
const boxVariants: Variants = {
  //tomato는 custom에서 받는다.
  entry: (tomato: boolean) =>
    tomato
      ? {
          x: -500,
          opacity: 0,
          scale: 0,
        }
      : {
          x: 500,
          opacity: 0,
          scale: 0,
          transition: {
            duration: 0.5,
            damping: 1,
          },
        },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    // transition: { damping: 0.5 },
  },
  leaving: (tomato: boolean) =>
    tomato
      ? {
          x: 500,
          opacity: 0,
          scale: 0,
          transition: {
            duration: 0.5,
            damping: 1,
          },
        }
      : {
          x: -500,
          opacity: 0,
          scale: 0,
        },
};

export default function App() {
  const [back, setBack] = useState(false);
  const [visible, setVisible] = useState(1);
  const _nextbox = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 1 : prev + 1));
  };

  const _prevbox = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 10 : prev - 1));
  };
  // key만 바꿔도 기존 element가 사라지고 새로 생겼다고 여긴다.
  return (
    <>
      <BigWrapper>
        <Wrapper>
          {/* 자식컴포넌트에에 넣어주기위해 받는것뿐 */}
          {/* mode = "wait" 다음 애니메이션까지 기다려줌 */}
          <AnimatePresence mode="wait" custom={back}>
            <Box
              custom={back}
              variants={boxVariants}
              initial="entry"
              animate="center"
              exit="leaving"
              key={visible}>
              {visible}
            </Box>
          </AnimatePresence>
        </Wrapper>
        <button onClick={_nextbox}>Next</button>
        <button onClick={_prevbox}>Prev</button>
      </BigWrapper>
    </>
  );
}
