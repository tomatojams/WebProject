import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IForm } from "../type/IForm";
import { Nav, Col, Logo, Items, Item, Circle, Search, SearchInput } from "./HeaderStyled";
// useForm

// 애니메이션용 객체
const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    scale: [1, 1.1, 1],
    transition: { repeat: Infinity },
  },
};

const navVarients = {
  top: { backgroundColor: "rgba(0,0,0,0)" },
  scroll: { backgroundColor: "rgba(0,0,0,1)" },
};

function Header() {
  const { register, watch, handleSubmit } = useForm<IForm>();

  // 값이 같은지 확인해서 상태변수로 저장
  // 라우터안에 있기때문에 "/"로 시작한다.
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch("/netflex/");
  const tvMatch = useMatch("/netflex/Tv");

  // Variants와 같은 효과를 내는 객체 생성
  const inputAnimaion = useAnimation();
  const navAnimation = useAnimation();
  const navAnimation2 = useAnimation();
  const [black, setBlack] = useState(false);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  // input 모니터링
  const searchTerm = watch("keyword");
  console.log(searchTerm);

  // 초기화면 강제 home 설정
  useEffect(() => {
    if (!homeMatch) {
      navigate("/netflex/", { replace: true });
    }
  }, []);
  // 스크롤 감지
  useEffect(() => {
    // 변화가 일어나는 변수에서 조건부여 ***
    scrollY.on("change", () => {
      // console.log(scrollY.get());
      if (scrollY.get() > 80) {
        setBlack(true);
        navAnimation2.start("scroll"); // Varient의 라벨주입
        navAnimation.start({ backgroundColor: "rgba(0,0,0,1)" }); // useAnimation 상태 객체주입
      } else {
        setBlack(false);
        navAnimation2.start("top");
        navAnimation.start({ backgroundColor: "rgba(0,0,0,0)" });
      }
    });
  }, [scrollY, navAnimation]);

  console.log(scrollY.get());
  const onValid = (data: IForm) => {
    console.log("Form data:", data);
    navigate(`/netflex/search?keyword=${data.keyword}`, { replace: true });
  };
  const _toggleSearch = () => {
    // inputAnimaion 라는 state 변수를 만들어서 사용하면 여러개의 요소에 삽입가능
    if (searchOpen) {
      inputAnimaion.start({ scaleX: 0 });
    } else {
      inputAnimaion.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };
  //
  return (
    <>
      <Nav
        variants={navVarients}
        animate={
          //방법1
          // 상태변수.get() + 일반객체 - > 안될 수있음
          // scrollY.get()가  직접적인 상태값이 아니기때문
          // scrollY.get() > 80
          //   ? { backgroundColor: "rgba(0,0,0,1)" }
          //   : { backgroundColor: "rgba(0,0,0,0)" }

          // 방법2 -> 직접적인 상태값일때는 비교문으로 리렌더링이 잘 작동한
          black ? { backgroundColor: "rgba(0,0,0,1)" } : { backgroundColor: "rgba(0,0,0,0)" }

          // 방법3
          // useAnimation 으로 객체주입 + useEffect
          // navAnimation
          // 방법4
          // Variants + useEffect + useAnimation
          // navAnimation2
        }>
        <Col>
          <Logo
            variants={logoVariants}
            initial="normal"
            whileHover="active"
            xmlns="http://www.w3.org/2000/svg"
            width="1024"
            height="276.742"
            viewBox="0 0 1024 276.742">
            <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
          </Logo>

          <Items>
            <Item>
              {homeMatch ? <Circle layoutId="circle" /> : null}
              {/* 새로고침없이 쓰려면 Link */}
              <Link to={"/netflex/"}>Home</Link>
            </Item>
            <Item>
              {tvMatch && <Circle layoutId="circle" />}
              {/* /Tv Tv 상대경로 절대경로 다 먹음 */}
              <Link to={"/netflex/Tv"}>Tv Shows</Link>
            </Item>
          </Items>
        </Col>

        <Col>
          <Search onSubmit={handleSubmit(onValid)}>
            <SearchInput
              {...register("keyword", { required: true, minLength: 2 })}
              initial={{ scaleX: 0 }}
              animate={inputAnimaion}
              transition={{ type: "linear" }}
              placeholder="Search for movie or tvshow"
            />
            <motion.svg
              onClick={_toggleSearch}
              //** state 와 연결되는 animation
              animate={{ x: searchOpen ? -153 : 0 }}
              transition={{ type: "linear" }}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"></path>
            </motion.svg>
          </Search>
        </Col>
      </Nav>
    </>
  );
}

export default Header;
