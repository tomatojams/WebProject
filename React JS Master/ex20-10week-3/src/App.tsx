import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { minutesSelector, secondsSelector, toCount, roundState, goalState } from "./atoms";
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

const ClockTimer = 5;

export default function App() {
  const minutes = useRecoilValue(minutesSelector);
  const seconds = useRecoilValue(secondsSelector);

  const [time, setTime] = useRecoilState(toCount);
  const [round, setRound] = useRecoilState(roundState);
  const [goal, setGoal] = useRecoilState(goalState);
  const [isRunning, setIsRunning] = useState(false);

  const incrementGoal = () => {
    if (goal !== 12) {
      setGoal((prev) => prev + 1);
    } else {
      setGoal(0);
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setTimeout(() => {
      if (time === 0) {
        if (round === 3) {
          incrementGoal();
          setTime(ClockTimer);
          setRound(0);
        } else {
          setTime(ClockTimer);
          setRound((prev) => prev + 1);
        }
        return;
      }

      setTime((prev) => prev - 1);
    }, 1000);

    // 중복 실행 방지를 위해 타이머 클리어
    return () => clearTimeout(timer);
  }, [isRunning, time]);

  // 타이머 상태를 토글하는 함수
  const toggleTimer = () => setIsRunning((prev) => !prev);
  const iconPath = isRunning
    ? "M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z"
    : "M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z";

  return (
    <BigWrapper>
      <UpWrapper>
        <Box>{minutes}</Box>
        <Colon>
          <span>:</span>
        </Colon>
        <Box>{seconds}</Box>
      </UpWrapper>
      <Circle onClick={toggleTimer}>
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
