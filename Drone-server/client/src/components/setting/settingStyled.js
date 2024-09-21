import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f9fbfd;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;
const SensorCardWrapper = styled.div`
  width: 100%;
  height: 95%;
  max-height: 89vh;
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: white;
  margin-top: 20px;
  margin-left: 25px;
  margin-bottom: 25px;
  padding-top: 0px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  border-radius: 10px;
`;
const SensorCardList = styled.div`
  overflow-y: auto;
  background-color: white;

  /* 스크롤바 스타일 설정 */
  scrollbar-width: thin; /* Firefox용 */

  /* WebKit 기반 브라우저 (Chrome, Safari) */
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바 핸들의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cccccc; /* 스크롤바 핸들의 색상 */
    border-radius: 4px; /* 둥근 모서리 */
  }

  &::-webkit-scrollbar-track {
    background: none !important;
    box-shadow: none !important;
    border: none !important;
  }
`;

const DroneCardListWrapper = styled.div`
  height: 95%;
  width: 100%;
  max-height: 89vh;
  overflow-y: auto;
  display: flex;
  margin-top: 21px;
  margin-left: 20px;
  margin-right: 20px;
  width: 450px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-top: 0px;
  padding-bottom: 20px;
  color: #555555;
`;
const DroneCardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  background-color: white;

  /* 스크롤바 스타일 설정 */
  scrollbar-width: thin; /* Firefox용 */

  /* WebKit 기반 브라우저 (Chrome, Safari) */
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바 핸들의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cccccc; /* 스크롤바 핸들의 색상 */
    border-radius: 4px; /* 둥근 모서리 */
  }

  &::-webkit-scrollbar-track {
    background: none !important; /* 트랙을 완전히 제거 */
    box-shadow: none !important; /* 그림자 제거 */
    border: none !important; /* 경계선 제거 */
  }
`;

const Title = styled.h2`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #f1f5f9;
  padding: 10px 30px;
  margin: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  font-weight: bold;
  font-family: "Satoshi", sans-serif;
  letter-spacing: 0.36em;
  color: #0e43b9;
`;

const SearchInput = styled.input`
  margin-bottom: 10px;

  padding: 8px;

  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

const Dronelist = styled.ul`
  width: 100%;
  max-height: calc(100vh - 200px);
  padding: 0px 20px;
  max-height: 300px;
  overflow-y: auto;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cccccc;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`;

const AlignRight = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 4px 15px;
`;

const SimpleButton = styled.button`
  border: 1px solid #e2e8f0;
  padding: 3px 5px;
  margin: 5px;
  border-radius: 5px;
  background-color: #f1f5f9;
  &:hover {
    background-color: #e2e8f0;
  }
`;
const DroneElement = styled.li`
  width: 100%;
  height: 36px;
  padding: 0px 20px;
  margin: 5px 0px;
  cursor: pointer;
`;

export {
  MainContainer,
  ContentWrapper,
  SensorCardList,
  SensorCardWrapper,
  DroneCardList,
  DroneCardListWrapper,
  Title,
  SearchInput,
  Dronelist,
  AlignRight,
  SimpleButton,
  DroneElement,
};
