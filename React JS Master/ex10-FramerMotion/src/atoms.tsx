import { atom, selector, useSetRecoilState } from "recoil";

export const minuteState = atom<number>({
  key: "minutes",
  default: 0,
});

export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    // 여러개의 함수중 get을 불러오기때문에 destucturing으로 {get} ,{set} , {reset}등이 있음
    const minutes = get(minuteState);
    const hours = Math.floor(minutes / 60);
    return hours;
  },
  // selector의 set함수로 state 정해놓고 변경
  set: ({ set }, newValue) => { // newValue가 매개변수
    // 타입명시보다 함수로 변환
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});

//  커스텀훅으로 set처럼 state 변경
export const usePlustMinute = () => {
  const setMinutes = useSetRecoilState(minuteState);

  return (newValue: number) => {
    return setMinutes((prev) => prev + newValue);
  };
};
