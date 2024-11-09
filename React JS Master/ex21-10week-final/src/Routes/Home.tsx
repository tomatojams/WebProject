import { useQuery } from "react-query";
import { getMovies, getMovieInfo } from "../api";
import { AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import { IMoviesNow } from "../type/IMoviesNow";
import { IMovieInfo } from "../type/IMovieInfo";
import {
  Wrapper,
  Loader,
  Banner,
  Title,
  Overview,
  Slider,
  Row,
  Box,
  Info,
  Overlay,
  MovieInfo,
  Block,
  BigMovie,
} from "../Components/HomeStyled";
import { findIndexById } from "../utils";
import { rowVariants, boxVariants, infoVariants } from "../Components/AniVariants";

const offset = 6;
//home
export default function Home() {
  const [leaving, setLeaving] = useState(false);
  const { scrollY } = useScroll(); // Y 위치 포착 팝업용
  const [index, setIndex] = useState(0);
  const navigate = useNavigate(); // 경로변경을 강제로 시킴
  const bigMovieMatch = useMatch("/netflex/movies/:id"); // 경로일치 검사, 주소가 바뀔때마다 자동실행
  const [movieIds, setMovieIds] = useState<number[]>([]); // 두번째 쿼리를 위한 첫번째 쿼리 결과

  // 코드개선
  // 1. 첫번째쿼리 - onSuccess: 로성공후 작업세팅
  const { data, isLoading } = useQuery<IMoviesNow>(
    ["movies", "nowPlaying"],
    () => getMovies("en", 1),
    {
      //**  onSuccess: 성공후 조건부여
      onSuccess: (data) => {
        if (data?.results) {
          const ids = data.results.map((item) => item.id);
          setMovieIds(ids);
        }
      },
    }
  );

  // 2. 두번째 쿼리 - enabled로 두번째 쿼리 실행
  // useEffect를 두번쓰는걸 방지. 상태변수 절약
  const { data: detail, isLoading: isDetailLoading } = useQuery<IMovieInfo[]>(
    ["movies", "details", movieIds], //** Promise.all fetch로 받는 배열전송
    () => Promise.all(movieIds.map((id) => getMovieInfo(id))),
    {
      enabled: movieIds.length > 0, // 조건부 실행: movieIds가 존재할 때만 실행
    }
  );

  console.log("DetailInfoMovie", detail);

  // 이벤트함수
  // 가로 스크롤
  const increseIndex = () => {
    if (leaving) return;
    const totalMovies = data?.results.length || 0;
    const maxIndex = Math.floor((totalMovies - 1) / offset - 1);
    setLeaving(true);
    setIndex((prev) => {
      if (prev === maxIndex) {
        return 0;
      }
      return prev + 1;
    });
  };

  // 박스클릭
  const onBoxClicked = (movieId: number) => {
    navigate(`/netflex/movies/${movieId}`);
  };
  //뒤로가기
  const resetBigMatch = () => {
    navigate("/netflex/");
  };

  // find-> 조건 만족하는 첫번째 요소 반환 하므로 해당무비가 반환됨
  const clickedMovie =
    bigMovieMatch?.params.id &&
    data?.results.find((movie) => movie.id === +(bigMovieMatch.params.id + ""));
  console.log(clickedMovie);

  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Loader>Loading..</Loader>
        ) : (
          <>
            {/* 데이타없으면 빈문자열 보냄 */}
            <Banner onClick={increseIndex} bgPhoto={data?.results[0].backdrop_path || ""}>
              <Title>{data?.results[0].title}</Title>
              <Overview>{data?.results[0].overview}</Overview>
            </Banner>
            <Slider>
              {/* 새로 배운것 *** */}
              <AnimatePresence initial={false} onExitComplete={() => setLeaving(false)}>
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
            </Slider>
            <AnimatePresence>
              {bigMovieMatch ? (
                <>
                  <BigMovie
                    id={bigMovieMatch.params.id || ""}
                    detail={detail!}
                    layoutId={bigMovieMatch.params.id}
                    style={{ top: scrollY.get() + 100 }}>
                    {bigMovieMatch.params.id ? (
                      <>
                        {/* 데이타 존재검사후 화면표시 */}
                        {!isDetailLoading &&
                          detail &&
                          bigMovieMatch.params.id &&
                          findIndexById(+bigMovieMatch.params.id, detail) && (
                            <MovieInfo>
                              <Block>
                                <h4>
                                  Age:
                                  <span>
                                    {detail![findIndexById(+bigMovieMatch.params.id, detail!)].adult
                                      ? "Only for adults"
                                      : "For everyone"}
                                  </span>
                                </h4>
                              </Block>
                              <div>
                                <h4>Overview</h4>
                                <span>
                                  {
                                    detail![findIndexById(+bigMovieMatch.params.id, detail!)]
                                      .overview
                                  }
                                </span>
                              </div>
                              <Block>
                                <h4>Status</h4>
                                <span>
                                  {detail![findIndexById(+bigMovieMatch.params.id, detail!)].status}
                                </span>
                              </Block>
                              <Block>
                                <h4>vote_average</h4>
                                <span>
                                  {
                                    detail![findIndexById(+bigMovieMatch.params.id, detail!)]
                                      .vote_average
                                  }
                                </span>
                              </Block>
                            </MovieInfo>
                          )}
                      </>
                    ) : null}
                  </BigMovie>
                  <Overlay
                    onClick={resetBigMatch}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}></Overlay>
                </>
              ) : null}
            </AnimatePresence>
          </>
        )}
      </Wrapper>
    </>
  );
}
