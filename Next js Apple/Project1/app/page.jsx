

export default function Tomato() {
  let name = "Kim";
  const link = "http://google.com";
  return (
    <div>
 
      <h4 style={{ fontSize: "20px" }} className="title">
        토마토 프레쉬
      </h4>
      <span className="title-sub"> by tomato {name}</span>
      <a href={link}>구글</a>
    </div>
  );
}
