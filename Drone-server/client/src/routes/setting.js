import AppHeader from "../components/nav";
import styled from "styled-components";
import React from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { selectedDroneState } from "../atom";
import { useQuery } from "react-query";
import { fetchDronePositions } from "../components/api";

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
// Card 스타일
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

// Title 스타일
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
  padding: 0px 20px;
`;

const DroneElement = styled.li`
  width: 100%;
  height: 36px;
  padding: 0px 20px;
  margin: 5px 0px;
`;

//
export default function Setting() {
  // Query받아옴
  const { data: latestPositions = [] } = useQuery(["dronePositions"], fetchDronePositions, {
    refetchInterval: 1000,
  });

  const { register, watch } = useForm();

  // 선택된 드론 ID를 저장해서 백그라운드 색상을 변경**
  const [selectedDroneId, setSelectedDroneId] = useRecoilState(selectedDroneState);

  const handleItemClick = (droneId) => {
    // 클릭된 드론 ID가 현재 선택된 드론과 같으면 선택 해제, 아니면 선택
    setSelectedDroneId((prevId) => (prevId === droneId ? null : droneId));
  };
  const searchTerm = watch("search") || ""; // useState("") 처음 빈문자열 초기화

  const filteredDronsList = latestPositions.filter((drone) =>
    // toLowerCase()를 쓰려면 undefined가 아니어야 하므로 ? 또는 ""로 초기화
    drone.name.toLowerCase().includes(searchTerm?.toLowerCase())
  );
  return (
    <MainContainer>
      <AppHeader />
      <ContentWrapper>
        <SensorCard>
          <Title>SONSOR SETTING</Title>
        </SensorCard>
        <DroneCard>
          <Title>DRONE LIST</Title>
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
                    className={`drone-list-item-name ${searchTerm && drone.name.toLowerCase().includes(searchTerm.toLowerCase()) ? "bold" : ""}`}>
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
