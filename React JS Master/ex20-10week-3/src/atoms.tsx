import { atom, selector, atomFamily } from "recoil";

// 1. 시간(초) 상태 변수 및 초기값 설정
const ClockTimer = 5;

export const toCount = atom({
  key: "time",
  default: ClockTimer,
});

export const roundState = atom({
  key: "roundState",
  default: 0,
});

export const goalState = atom({
  key: "goalState",
  default: 0,
});

// 4. 분을 가져오는 selector
export const minutesSelector = selector({
  key: "minutesSelector",
  get: ({ get }) => {
    const time = get(toCount);
    return Math.floor(time / 60); // 초를 분으로 변환
  },
});

// 5. 초를 가져오는 selector
export const secondsSelector = selector({
  key: "secondsSelector",
  get: ({ get }) => {
    const time = get(toCount);
    return time % 60; // 초 단위로 나머지 계산
  },
});

// 타이머 상태 관리를 위한 selector
export const timeManagerSelector = selector({
  key: "timeManagerSelector",
  get: ({ get }) => {
    const time = get(toCount);
    const round = get(roundState);
    const goal = get(goalState);

    return { time, round, goal };
  },
  set: ({ get, set }) => {
    const time = get(toCount);
    const round = get(roundState);
    const goal = get(goalState);

    if (time === 0) {
      if (round === 3) {
        set(goalState, goal < 12 ? goal + 1 : 0);
        set(roundState, 0);
      } else {
        set(roundState, round + 1);
      }
      set(toCount, ClockTimer);
    } else {
      set(toCount, time - 1);
    }
  },
});
