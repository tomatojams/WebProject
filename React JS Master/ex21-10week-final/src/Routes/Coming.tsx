import { useQuery } from "react-query";
// import { getNowMovies, getMovieInfo, getUpcomingMovies, getPopularMovies } from "../api";
import { getMovieInfo, getUpcomingMovies } from "../api";
import { AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import { IMoviesNow } from "../type/IMoviesNow";
import { IMovieInfo } from "../type/IMovieInfo";
import {
  Wrapper,
  Loader,
  Slider,
  Row,
  Box,
  Info,
  Overlay,
  MovieInfo,
  Block,
  BigMovie,
  ScrollTopButton,
} from "../Components/HomeStyled";
import { findIndexById } from "../utils";
import { rowVariants, boxVariants, infoVariants } from "../Components/AniVariants";

//home
export default function Home() {
  const { scrollY } = useScroll(); // Y 위치 포착 팝업용

  const navigate = useNavigate(); // 경로변경을 강제로 시킴
  const bigMovieMatch = useMatch("/movies/:id"); // 경로일치 검사, 주소가 바뀔때마다 자동실행
  const [movieIds, setMovieIds] = useState<number[]>([]); // 두번째 쿼리를 위한 첫번째 쿼리 결과

  // 코드개선
  // 1. 첫번째쿼리 - onSuccess: 로성공후 작업세팅
  const { data, isLoading } = useQuery<IMoviesNow>(
    ["movies", "coming"],
    () => getUpcomingMovies("en", 1),
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
  useEffect(() => {
    // 페이지 로드 시 스크롤을 최상단으로 이동
    window.scrollTo(0, 0);
  }, []);

  console.log("DetailInfoMovie", detail);

  // 이벤트함수

  // 박스클릭
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  //뒤로가기
  const resetBigMatch = () => {
    navigate("/");
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Loader>Loading..</Loader>
        ) : (
          <>
            <Slider>
              <Row variants={rowVariants} initial="start" animate="end">
                {data?.results.slice().map((movie) => (
                  <Box
                    layoutId={movie.id + ""}
                    onClick={() => onBoxClicked(movie.id)}
                    variants={boxVariants}
                    photo={movie.poster_path || ""}
                    key={movie.id}>
                    <Info variants={infoVariants}>
                      <h5>{movie.title}</h5>
                    </Info>
                  </Box>
                ))}
              </Row>
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
        )}{" "}
        <ScrollTopButton onClick={scrollToTop}>Top</ScrollTopButton>
      </Wrapper>
    </>
  );
}
