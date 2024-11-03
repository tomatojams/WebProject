import { atom, selector } from "recoil";

// 1. 시간(초) 상태 변수
export const toCount = atom({
  key: "time",
  default: 5, // 테스트용으로 5초로 설정, 실제 사용 시 25 * 60으로 변경
});

// 2. 라운드 상태 변수
export const roundState = atom({
  key: "roundState",
  default: 0,
});

// 3. GOAL 상태 변수
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

