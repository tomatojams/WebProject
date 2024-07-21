import Image from "next/image";
// 이미지 최적화 컴포넌트  lazy loading, 사이즈 최적화, lazy shift 방지
// import food from "/public/food0.png";
export default function List() {
  let 상품 = ["TOMATO", "PASTA", "COCONUT"];

  return (
    <div>
      <h4 className="title-sub">토마토 리스트</h4>
      {상품.map((item, index) => {
        return (
          // 리턴해주면 새로운 어레이 생성
          <div className="food" key={index}>
            <img src={`/food${index}.png`} alt="" className="food-img" />
            <h4>{item} $40</h4>
          </div>
        );
      })}
    </div>
  );
}
