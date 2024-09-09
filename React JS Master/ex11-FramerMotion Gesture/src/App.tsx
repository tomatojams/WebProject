import styled from "styled-components";

import { motion, Variants } from "framer-motion";
import { useRef } from "react";
const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  /* background-color: #de23c2; */
  justify-content: center;
  align-items: center;
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
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants: Variants = {
  hover: { scale: 1, rotateZ: 180 },
  Tap: { scale: 1, borderRadius: "100px" },
  //애니메이션을 위해서는 숫자형태등 rgba로 넣어줘야함 not "blue"
  drag: {
    backgroundColor: "rgba(26, 188, 156,1.0)",
    transition: {
      duration: 0.5,
    },
  },
};

export default function App() {
  let activated = true;
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Wrapper>
        <BiggerBox ref={biggerBoxRef}>
          <Box
            drag
            // drag="x"
            dragSnapToOrigin={true} // 다시 제자리로 돌아옴
            dragElastic={0.5} //   당김
            dragConstraints={biggerBoxRef}
            variants={boxVariants}
            whileHover={activated ? "hover" : "cool"}
            whileDrag="drag"
            whileTap="Tap"></Box>
        </BiggerBox>
      </Wrapper>
    </>
  );
}
