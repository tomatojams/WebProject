import { useRecoilState } from "recoil";
import { GlobalStyle } from "./css/resetGlobal";
import { hourSelector, minuteState, usePlustMinute } from "./atoms";
import React from "react";
// import React, { useState } from "react";

export default function App() {
  const plusMinute = usePlustMinute();

  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hoursState, setHourState] = useRecoilState(hourSelector);
  const _onMinuteChange = (e: React.FormEvent<HTMLInputElement>) => {
    //input은  type관련없이 무조건 string을 전달함
    setMinutes(+e.currentTarget.value);
  }; // +를 앞에 붙이면 string -> number로 형변환

  const _onHourChange = (e: React.FormEvent<HTMLInputElement>) => {
    // setMinutes(+e.currentTarget.value * 60);
    setHourState(+e.currentTarget.value);
  };

  const _onPlusChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("plus") as HTMLInputElement;
    plusMinute(+input.value);
  };

  return (
    <>
      <GlobalStyle />
      <label htmlFor="minute">Minutes </label>
      <input
        id="minute"
        value={minutes}
        onChange={_onMinuteChange}
        type="number"
        placeholder="Minutes"
      />
      <label htmlFor="hour">Hour </label>
      <input
        id="hour"
        value={hoursState}
        onChange={_onHourChange}
        type="number"
        placeholder="Hours"
      />
      <form onSubmit={_onPlusChange}>
        <label htmlFor="plus">Minute Plus </label>
        <input is="plus" name="plus" type="number" placeholder="PlusMinutes" />
      </form>
    </>
  );
}
