import { useQuery } from "react-query";
import { getMovies, IMoviesNow } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 100px;
  cursor: pointer;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// 두개의배경 하나는 흐린색 하나는사진 글자가잘 보이게하기위해서
const Banner = styled.div<{ bgPhoto: string }>`
background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url(${(
  props
) => makeImagePath(props.bgPhoto, "original")});
background-size: cover;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
padding:60px
background-color: red;

`;

const Title = styled.h2`
  padding-left: 30px;
  font-size: 68px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  padding-left: 30px;
  font-size: 24px;
  width: 50%;
`;

const Slider = styled.div`
  // gap: 50px;
  // display: flex;
  // flex-direction: column;
  position: relative;
  top: -200px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  margin-bottom: 5px;
`;

const Box = styled(motion.div)<{ photo: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)),
    url(${(props) => makeImagePath(props.photo, "w500")});
  background-color: white;
  // 중요***
  background-size: cover;
  // 중요*** 이것때문에 축소될때 가려짐
  // relative는 z-index를 자동으로하기때문에 의도치않게 동작할수있다
  // position: relative;

  background-position: center center;
  height: 200px;
  color: #aaa;
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 10px;
  // *** 중요
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h5 {
    text-align: center;
    font-size: 12px;
  }
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 10, //아이콘사이거리띄우기
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 99,
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.2,
      duaration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;
//home
export default function Home() {
  // history를 볼수있음
  const navigate = useNavigate();
  console.log("History", history);

  const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:id");
  console.log(bigMovieMatch);
  const { data, isLoading } = useQuery<IMoviesNow>(
    ["movies", "nowPlaying"],
    //인자던저주지않아서 에러남
    () => getMovies("en", 1)
  );
  const [leaving, setLeaving] = useState(false);

  const [index, setIndex] = useState(0);
  const totalMovies = data?.results.length || 0;
  const maxIndex = Math.floor((totalMovies - 1) / offset - 1);
  console.log(`maxIndex: ${maxIndex}`);
  const increseIndex = () => {
    if (leaving) return;
    setLeaving(true);
    setIndex((prev) => {
      if (prev === maxIndex) {
        return 0;
      }
      return prev + 1;
    });
  };
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  return (
    <>
      {}
      <Wrapper>
        {isLoading ? (
          <Loader>Loading..</Loader>
        ) : (
          <>
            {/* 데이타없으면 빈문자열 보냄 */}
            <Banner
              onClick={increseIndex}
              bgPhoto={data?.results[0].backdrop_path || ""}>
              <Title>{data?.results[0].title}</Title>
              <Overview>{data?.results[0].overview}</Overview>
            </Banner>
            <Slider>
              {/* 새로 배운것 *** */}
              <AnimatePresence
                initial={false}
                onExitComplete={() => setLeaving(false)}>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={index}
                  transition={{ type: "linear", duration: 1 }}>
                  {data?.results
                    .slice(1)
                    .slice(index * offset, index * offset + offset)
                    .map((movie) => (
                      <Box
                        layoutId={movie.id + ""}
                        onClick={() => onBoxClicked(movie.id)}
                        variants={boxVariants}
                        initial="normal"
                        // transition을 각각 부여해서 모든 transitions이 같지 않게한다 **
                        whileHover="hover"
                        photo={movie.poster_path || ""}
                        transition={{ type: "tween" }}
                        key={movie.id}>
                        {/* hover는 상속받아서자동적용됨 */}
                        <Info variants={infoVariants}>
                          <h5>{movie.title}</h5>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
              {/* <Row>
                {[7, 8, 9, 10, 11, 12].map((item) => (
                  <Box
                    photo={data?.results[item].poster_path || ""}
                    key={item}></Box>
                ))}
              </Row>{" "}
              <Row>
                {[13, 14, 15, 16, 17, 18].map((item) => (
                  <Box
                    photo={data?.results[item].poster_path || ""}
                    key={item}></Box>
                ))}
              </Row> */}
            </Slider>
            <AnimatePresence>
              {bigMovieMatch ? (
                <motion.div
                  layoutId={bigMovieMatch.params.movieId}
                  style={{
                    position: "absolute",
                    width: "40vw",
                    height: "80vh",
                    backgroundColor: "red",
                    top: 50,
                    left: 0,
                    right: 0,
                    margin: "0 auto",
                  }}></motion.div>
              ) : null}
            </AnimatePresence>
          </>
        )}
      </Wrapper>
    </>
  );
}
