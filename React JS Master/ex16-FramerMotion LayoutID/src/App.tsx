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

  justify-content: space-around;
  align-items: center;
`;
const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 80px;
  width: 80px;
  border-radius: 40px;

  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Box = styled(motion.div)`
  box-sizing: border-box;
  // 밀림현상방지

  width: 300px;
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
  const [clicked, setClicked] = useState(false);
  const _toggle = () => {
    setClicked((prev) => !prev);
  };

  return (
    <>
      <BigWrapper>
        <Wrapper onClick={_toggle}>
          <Box>
            {/* layout만 주면 변화할때 애니메이션 됨 */}
            {clicked ? (
              <Circle layoutId="a" style={{ borderRadius: "40px" }} />
            ) : null}
          </Box>
          <Box>
            {!clicked ? (
              <Circle layoutId="a" style={{ borderRadius: "0px", scale: 2 }} />
            ) : null}
          </Box>
        </Wrapper>
      </BigWrapper>
    </>
  );
}
