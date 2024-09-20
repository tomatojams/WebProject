import AppHeader from "../components/nav";
import styled from "styled-components";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { selectedDroneState } from "../atom";
import { useQuery } from "react-query";
import { fetchDroneList, deleteDroneList } from "../components/api";
import PopupComponent from "../components/popup";

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

const DroneElement = styled.li`
  width: 100%;
  height: 36px;
  padding: 0px 20px;
  margin: 5px 0px;
  cursor: pointer;
`;
export default function Setting() {
  const { data: droneList = [], refetch } = useQuery("droneList", fetchDroneList, {
    refetchInterval: 10000,
  });

  const { register, watch } = useForm();
  const [selectedDroneId, setSelectedDroneId] = useRecoilState(selectedDroneState);
  const [popupDrone, setPopupDrone] = useState(null);

  const searchTerm = watch("search") || "";

  const filteredDronsList = droneList.filter((drone) =>
    drone.name.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const handleDelete = async () => {
    try {
      await deleteDroneList();
      refetch();
    } catch (error) {
      console.error("Error deleting drones:", error);
    }
  };

  const handleItemClick = (droneId) => {
    setSelectedDroneId((prevId) => (prevId === droneId ? null : droneId));
    const selectedDrone = droneList.find((drone) => drone.droneId === droneId);
    setPopupDrone(selectedDrone);
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

      {/* Popup 컴포넌트 사용 */}
      <PopupComponent popupDrone={popupDrone} onClose={() => setPopupDrone(null)} />
    </MainContainer>
  );
}
