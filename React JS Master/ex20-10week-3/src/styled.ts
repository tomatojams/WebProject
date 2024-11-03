import styled from "styled-components";
import { AnimatePresence, motion, Variants } from "framer-motion";

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
  gap: 30px;
`;
const UpWrapper = styled(motion.div)`
  height: 45vh;
  width: 100vw;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

const LowWrapper = styled(motion.div)`
  height: 50vh;
  width: 100vw;
  display: flex;
  gap: 40px;
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
  width: 100px; // 원하는 크기로 설정
  height: 100px;
`;

const Colon = styled(motion.div)`
  font-size: 7rem;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-10%);
`;
const ViewBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 1.5rem;
`;

export { BigWrapper, UpWrapper, LowWrapper, Circle, Box, StyledIcon, Colon, ViewBox };
