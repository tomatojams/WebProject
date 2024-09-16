import styled from "styled-components";
import { motion } from "framer-motion";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  position: relative;
  transition: color 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  bottom: -12px;
  width: 6px;
  height: 6px;
  border-radius: 3px;

  background-color: ${(props) => props.theme.red};
`;

const Search = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  color: white;
  svg {
    height: 25px;
  }
`;

const SearchInput = styled(motion.input)`
  // 변화시작점
  transform-origin: right center;
  position: absolute;
  left: -160px;
  padding: 8px 10px;
  padding-left: 40px;
  z-index: -1;
  background-color: transparent;
  color: #b6b6b6;
  border: 1px solid #3d3d3d;
`;

export {Nav, Col, Logo, Items, Item, Circle, Search, SearchInput}