import { Link, useNavigate } from "react-router-dom";

import { useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { Nav, Items, Item, Circle } from "./HeaderStyled";
// useForm

function Header() {
  // 값이 같은지 확인해서 상태변수로 저장
  // 라우터안에 있기때문에 "/"로 시작한다.

  const popularMatch = useMatch("/");
  const comingMatch = useMatch("/coming-soon");
  const nowMatch = useMatch("/now-playing");

  const navigate = useNavigate();
  // const { scrollY } = useScroll();
  // input 모니터링

  // 초기화면 강제 home 설정
  useEffect(() => {
    if (!popularMatch) {
      navigate("/", { replace: true });
    }
  }, []);

  //
  return (
    <>
      <Nav>
        <Items>
          <Item>
            {popularMatch ? <Circle layoutId="circle" /> : null}
            {/* 새로고침없이 쓰려면 Link */}
            <Link to={"/"}>POPULAR</Link>
          </Item>
          <Item>
            {comingMatch && <Circle layoutId="circle" />}
            {/* /Coming Coming 상대경로 절대경로 다 먹음 */}
            <Link to={"/coming-soon"}>COMING SOON</Link>
          </Item>
          <Item>
            {nowMatch && <Circle layoutId="circle" />}

            <Link to={"/now-playing"}>NOW PLAYING</Link>
          </Item>
        </Items>
      </Nav>
    </>
  );
}

export default Header;
