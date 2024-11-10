import styled from "styled-components";

import { motion, Variants } from "framer-motion";

export default function App() {
  const Wrapper = styled(motion.div)`
    height: 100vh;
    width: 100vw;
    display: flex;
    /* background-color: #de23c2; */
    justify-content: center;
    align-items: center;
  `;

  const Box = styled(motion.div)`
    width: 200px;
    height: 200px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 40px;
    box-shadow:
      0 2px 3px rgba(0, 0, 0, 0.1),
      0 10px 20px rgba(0, 0, 0, 0.06);
    /* display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center; */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  `;
  const Circle = styled(motion.div)`
    align-self: center;
    justify-self: center;
    width: 70px;
    height: 70px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 35px;
    box-shadow:
      0 2px 3px rgba(0, 0, 0, 0.1),
      0 10px 20px rgba(0, 0, 0, 0.06);
  `;

  // const myVars: Variants = {
  //   start: { scale: 0 },
  //   end: {
  //     scale: 1,
  //     rotateZ: 360,
  //     transition: { type: "spring", damping: 10, duration: 3, bounce: 0.5 },
  //   },
  // };

  const boxVariants: Variants = {
    start: { opacity: 0, scale: 0.5 },
    end: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.5,
        bounce: 0.5,
        // 하위 컴포넌트에 적용
        delayChildren: 0.5,
        // 하위컴포넌트 텀
        staggerChildren: 0.2,
      },
    },
  };

  const circleVariants = {
    start: { opacity: 0, y: -10 },
    end: {
      opacity: 1,
      // framer motion에만 있는 특성 x, y
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <>
      <Wrapper>
        <Box variants={boxVariants} initial="start" animate="end">
          {/* framer 객체에서 자식은 부모의 props를 계승 따라서, initial="start" animate="end" 은 계승 */}
          <Circle variants={circleVariants} />
          <Circle variants={circleVariants} />
          <Circle variants={circleVariants} />
          <Circle variants={circleVariants} />
        </Box>
      </Wrapper>
    </>
  );
}
