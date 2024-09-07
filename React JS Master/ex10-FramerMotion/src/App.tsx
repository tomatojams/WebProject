import styled from "styled-components";

import {motion} from 'framer-motion';

export default function App() {
  const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    /* background-color: #de23c2; */
    justify-content: center;
    align-items: center;
  `;

  const Box = styled.div`
    width: 200px;
    height: 200px;
    background-color: white;
    border-radius: 10px;
    box-shadow:
      0 2px 3px rgba(0, 0, 0, 0.1),
      0 10px 20px rgba(0, 0, 0, 0.06);
  `;

  return (
    <>
      <Wrapper>
        <Box />
        <motion.div></motion.div>
      </Wrapper>
    </>
  );
}
