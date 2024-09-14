import styled from "styled-components";

import { motion, useMotionValue, Variants, useTransform, useScroll } from "framer-motion";
import { useEffect } from "react";

const Wrapper = styled(motion.div)`
  height: 150vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 50px;
  /* background-color: #de23c2; */
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
  justify-content: center;
  align-items: center;
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
  Tap: { scale: 1, borderRadius: "50px" },
  //애니메이션을 위해서는 숫자형태등 rgba로 넣어줘야함 not "blue"
  drag: {
    transition: {
      duration: 0.5,
    },
  },
};

export default function App() {
  const x = useMotionValue(0);
  const tomatojam = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-400, 0, 400],
    [
      "linear-gradient(135deg, rgb(219, 233, 29), rgb(21, 201, 102))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(27, 42, 83), rgb(84, 39, 247))",
    ]
  );
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  useEffect(() => {
    scrollYProgress.on("change", () => console.log("YScoll", scrollYProgress.get()));

    // update된 추적방법
    // tomatojam.on("change", () => console.log(tomatojam.get()));
  }, [scrollYProgress]);

  return (
    <>
      <Wrapper style={{ background: gradient }}>
        <Box
          style={{ x: x, rotateZ: tomatojam, scale: scaleY }}
          drag
          // drag="x"
          dragSnapToOrigin={true} // 다시 제자리로 돌아옴
          dragElastic={0.5} //   당김
          variants={boxVariants}
          whileDrag="drag"
          whileTap="Tap"></Box>{" "}
        <button onClick={() => x.set(200)}>Click me</button>
      </Wrapper>
    </>
  );
}
