import styled from "styled-components";

import { animate, AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 200px;
  /* background-color: #de23c2; */
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
  justify-content: end;
  align-items: center;
  padding-bottom: 300px;
  box-sizing: border-box;
`;

const BiggerBox = styled(motion.div)`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const Box = styled(motion.div)`
  width: 300px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants: Variants = {
  start: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    opacity: 0,

    y: 50,
    scale: 0,
  },
};

export default function App() {
  const [showing, setShowing] = useState(false);
  return (
    <>
      <Wrapper>
        {/* AnimatePresence 컴포넌트 내부에 { 변수? true: false}를 포함해야함 */}
        <AnimatePresence>
          {showing ? (
            <Box
              variants={boxVariants}
              initial="start" // showing : false에 반응
              animate="visible" // showing :ture에 반응
              exit="leaving" // true -> false에 반응
            ></Box>
          ) : null}
        </AnimatePresence>
        <button onClick={() => setShowing((prev) => !prev)}>Click</button>
      </Wrapper>
    </>
  );
}
