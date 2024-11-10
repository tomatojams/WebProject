import styled from "styled-components";
import { motion } from "framer-motion";

const Nav = styled(motion.nav)`
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  z-index: 1000;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-top: 20px;
  font-size: 20px;
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

export { Nav, Items, Item, Circle, Search };
