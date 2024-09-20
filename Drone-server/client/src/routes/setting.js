import AppHeader from "../components/nav";
import styled from "styled-components";
import React from "react";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { selectedDroneState } from "../atom";
import { useQuery } from "react-query";
import { fetchDroneList, deleteDroneList } from "../components/api"; // fetchDroneList API로 변경

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

const SensorCard = styled.div`
  width: 100%;
  height: 95%;
  margin-top: 20px;
  margin-left: 25px;
  margin-bottom: 25px;

  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.1);
`;

const DroneCard = styled.div`
  height: 95%;
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
  padding-top: 70px;
  padding-bottom: 20px;
  color: #555555;
`;

const Title = styled.h2`
  position: absolute;
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

  &:focus {
    outline: none;
  }
`;

const Dronelist = styled.ul`
  width: 100%;
  max-height: calc(100vh - 200px);
  padding: 0px 20px;
  max-height: 300px; /* 최대 높이를 설정하여 스크롤 영역을 제한 */
  overflow-y: auto; /* 세로 스크롤 가능하도록 설정 */
  scrollbar-width: thin; /* 스크롤바 너비를 얇게 설정 (Firefox 지원) */

  /* 스크롤바 스타일 (Webkit 기반 브라우저, Chrome, Safari) */
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

const DroneElement = styled.li`
  width: 100%;
  height: 36px;
  padding: 0px 20px;
  margin: 5px 0px;
`;

export default function Setting() {
  // 새로운 드론 리스트 API로 변경
  const { data: droneList = [], refetch } = useQuery("droneList", fetchDroneList, {
    refetchInterval: 10000, // 10초마다 refetch
  });

  const { register, watch } = useForm();

  // 선택된 드론 ID를 저장해서 백그라운드 색상을 변경
  const [selectedDroneId, setSelectedDroneId] = useRecoilState(selectedDroneState);

  const searchTerm = watch("search") || ""; // useState("") 처음 빈문자열 초기화

  // 새로운 API로 받아온 데이터 구조에 맞게 수정
  const filteredDronsList = droneList.filter((drone) =>
    drone.name.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const handleDelete = async () => {
    try {
      await deleteDroneList(); // 드론 삭제 함수 호출
      refetch(); // 직접 refetch를 호출하여 데이터를 즉시 갱신
    } catch (error) {
      console.error("Error deleting drones:", error);
    }
  };
  const handleItemClick = (droneId) => {
    // 클릭된 드론 ID가 현재 선택된 드론과 같으면 선택 해제, 아니면 선택
    setSelectedDroneId((prevId) => (prevId === droneId ? null : droneId));
  };
  return (
    <MainContainer>
      <AppHeader />
      <ContentWrapper>
        <SensorCard>
          <Title>SENSOR SETTING</Title>
        </SensorCard>
        <DroneCard>
          <Title>DRONE LIST</Title>
          <button onClick={handleDelete}>초기화</button>
          <SearchInput
            {...register("search")}
            type="text"
            placeholder="드론 이름 검색..."
            value={searchTerm}
            className="drone-list-search"
          />
          {filteredDronsList.length > 0 ? (
            <Dronelist>
              {filteredDronsList.map((drone) => (
                <DroneElement
                  key={drone.droneId}
                  onClick={() => handleItemClick(drone.droneId)}
                  className={`drone-list-item ${selectedDroneId === drone.droneId ? "selected" : ""}`}>
                  <span
                    className={`drone-list-item-name ${
                      searchTerm && drone.name.toLowerCase().includes(searchTerm.toLowerCase())
                        ? "bold"
                        : ""
                    }`}>
                    {drone.name}
                  </span>
                </DroneElement>
              ))}
            </Dronelist>
          ) : (
            <p className="drone-list-placeholder">등록된 드론이 없습니다.</p>
          )}
        </DroneCard>
      </ContentWrapper>
    </MainContainer>
  );
}
