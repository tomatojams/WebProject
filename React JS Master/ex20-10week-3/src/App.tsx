import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { minutesSelector, secondsSelector, timeManagerSelector } from "./atoms";
import {
  BigWrapper,
  UpWrapper,
  LowWrapper,
  Circle,
  Box,
  StyledIcon,
  Colon,
  ViewBox,
} from "./styled";
import { motion, useAnimation } from "framer-motion";

export default function App() {
  const minutes = useRecoilValue(minutesSelector);
  const seconds = useRecoilValue(secondsSelector);
  const { round, goal } = useRecoilValue(timeManagerSelector);
  const setTimerState = useSetRecoilState(timeManagerSelector);
  const [isRunning, setIsRunning] = useState(false);

  const minutesBoxAnimation = useAnimation();
  const secondsBoxAnimation = useAnimation();
  const circleAnimation = useAnimation();

  useEffect(() => {
    // 분이 변할 때 애니메이션 실행
    minutesBoxAnimation.start({ scale: [0.8, 1], transition: { duration: 0.3 } });
  }, [minutes, minutesBoxAnimation]);

  useEffect(() => {
    // 초가 변할 때 애니메이션 실행
    secondsBoxAnimation.start({ scale: [0.8, 1], transition: { duration: 0.3 } });
  }, [seconds, secondsBoxAnimation]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setTimeout(() => {
      setTimerState((prev) => prev); // 내부 로직이 자동으로 실행됨
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, setTimerState, seconds]);

  const toggleTimer = () => {
    circleAnimation.start({ scale: [0.8, 1], transition: { duration: 0.3 } });
    setIsRunning((prev) => !prev);
  };
  const iconPath = isRunning
    ? "M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z"
    : "M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z";

  return (
    <BigWrapper>
      <UpWrapper>
        <Box as={motion.div} animate={minutesBoxAnimation}>
          {minutes}
        </Box>
        <Colon>
          <span>:</span>
        </Colon>
        <Box as={motion.div} animate={secondsBoxAnimation}>
          {seconds}
        </Box>
      </UpWrapper>
      <Circle as={motion.div} animate={circleAnimation} onClick={toggleTimer}>
        <StyledIcon
          data-slot="icon"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true">
          <path d={iconPath}></path>
        </StyledIcon>
      </Circle>
      <LowWrapper>
        <ViewBox>
          <span>{round}/4</span>
          <span>ROUND</span>
        </ViewBox>
        <ViewBox>
          <span>{goal}/12</span>
          <span>GOAL</span>
        </ViewBox>
      </LowWrapper>
    </BigWrapper>
  );
}
