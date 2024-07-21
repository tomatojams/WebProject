"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
// 이미지 최적화 컴포넌트  lazy loading, 사이즈 최적화, lazy shift 방지
// import food from "/public/food0.png";

export default function List() {
  let 상품 = ["TOMATO", "PASTA", "COCONUT"];

  // const [count, setCount] = useState(0);
  const [countList, setCountList] = useState([0, 0, 0]);

  const _onAdd = (index) => {
    let tempArray = [...countList]; // 어레이를 풀어서 독립적인 복사본 생성
    // deep copy

    // 새 state, 기존 state 비교
    // 그런데 리스트라서 주소값만 있어서 내용이 바뀌어도 주소값이
    // 바뀌지 않아서  tempArray = countList 하고 고치면 갱신안됨
    // console.lgo(tempArray == countList)
    // 따라서 풀어서 받은 후 새로운 리스트를 제작해서 주소값이 다
    // 바뀌게 해서 갱신해야함

    tempArray[index]++;

    setCountList(tempArray);
  };

  const _onSub = (index) => {
    if (countList[index] === 0) {
      return;
    }

    let tempArray = [...countList];
    tempArray[index]--;

    setCountList(tempArray);
  };

  return (
    <div>
      <h4 className="title-sub">토마토 리스트</h4>
      {상품.map((item, index) => {
        return (
          // 리턴해주면 새로운 어레이 생성
          <div className="food" key={index}>
            <img src={`/food${index}.png`} alt="" className="food-img" />
            <h4>{item} $40</h4>
            <button
              onClick={() => {
                _onSub(index);
              }}>
              {" "}
              -{" "}
            </button>
            <span> {countList[index]} </span>

            <button
              onClick={() => {
                _onAdd(index);
              }}>
              +
            </button>
          </div>
        );
      })}
    </div>
  );
}
