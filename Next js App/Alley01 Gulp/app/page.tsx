import Counter from "@/components/Counter";
import os from "os";
export default function Home() {
  //Node API 사용가능
  console.log(os.hostname());

  return <>
    <h1>시작페이지</h1>
    <Counter/>
  </>;
}
