import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Header = styled.header`
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CoinsList = styled.ul`
  padding-top: 20px;
`;

export const Coin = styled.li`
  margin: 10px 0;
  width: 500px;

  font-size: 16px;
  background-color: white;
  color: ${(props) => props.theme.accentColor};
  border-radius: 10px;

  a {
    display: flex;
    align-items: center;
    gap: 10px;

    // Link를 써도 결국 a로 변환됨
    padding: 20px; // 패딩에 여기에주면 모든 부분에서 클릭가능
    transition: color 300ms ease-in-out;
    /* display: block; // 패딩을 얼마를 주든 블락 모든 부분에서 클릭가능 */
  }

  &:hover {
    a {
      color: violet;
      cursor: pointer;
    }
  }
`;

export const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.textColor};
`;

export const Img = styled.img`
  width: 50px;
`;
