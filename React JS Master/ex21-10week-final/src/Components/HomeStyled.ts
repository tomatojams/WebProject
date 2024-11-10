import styled from "styled-components";
import { makeImagePath, findImageById } from "../utils";
import { motion } from "framer-motion";
import { IMovieInfo } from "../type/IMovieInfo";

const Wrapper = styled(motion.div)`
  display: flex;
  height: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  padding-top: 50px;
  padding-bottom: 100px;
  cursor: pointer;
  width: 100%;
`;
const Box2 = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
  /* display: flex;
flex-wrap: wrap;
justify-content: space-around;
align-items: center; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const Circle = styled(motion.div)`
  align-self: center;
  justify-self: center;
  width: 70px;
  height: 70px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 35px;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// 두개의배경 하나는 흐린색 하나는사진 글자가잘 보이게하기위해서
const Banner = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1));
  background-size: cover;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-color: black;
`;
const Title = styled.h2`
  color: #eee;
  padding-left: 30px;
  font-size: 68px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  padding-left: 30px;
  font-size: 24px;
  width: 50%;
  color: #eee;
`;
const Slider = styled(motion.div)`
  margin: 50px 20px;
  display: flex;
  gap: 20px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);

  width: 80%;
  margin-bottom: 5px;
`;
const Box = styled(motion.div)<{ photo: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)),
    url(${(props) => makeImagePath(props.photo, "w500")});
  background-color: white;

  background-size: cover;
  border-radius: 15px;
  background-position: center center;
  width: 250px;
  height: 400px;
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
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const MovieInfo = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  color: white;
  width: 100%;

  height: 100%;
  display: flex;
  padding: 40px;
  flex-direction: column;
  align-items: start;
  justify-content: end;
  gap: 5px;
`;
const Block = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;
const BigMovie = styled(motion.div)<{ id: string | undefined; detail: IMovieInfo[] | undefined }>`
  background-image: url(${(props) => makeImagePath(findImageById(props.id, props.detail), "w500")});
  background-size: cover;
  position: absolute;
  width: 600px;
  height: 80vh;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 150px;
  padding: 10px 15px;
  font-size: 16px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 30%;
  cursor: pointer;
  z-index: 1000;
  &:hover {
    background-color: #777;
  }
`;
export {
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
  Box2,
  Circle,
  ScrollTopButton,
};
