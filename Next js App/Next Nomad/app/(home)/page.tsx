// 메타데이타는 page 또는  layout 만 export 가능
// 메타데이타는 서버컴포넌트에만 있음

export const metadata = {
  title: "Home",
};

export default function Tomato() {
  return (
    <>
      <h1>Hello</h1>
    </>
  );
}
