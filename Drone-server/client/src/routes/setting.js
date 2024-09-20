import AppHeader from "../components/nav";
import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
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

const PopupOverlay = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const PopupField = styled.div`
  width: 100%;
  font-size: 14px;
  color: #555;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`;

export default function Setting() {
  // Drone 리스트 데이터 가져오기
  const { data: droneList = [], refetch } = useQuery("droneList", fetchDroneList, {
    refetchInterval: 10000,
  });

  const { register, watch } = useForm();
  const [selectedDroneId, setSelectedDroneId] = useRecoilState(selectedDroneState);
  const [popupDrone, setPopupDrone] = useState(null); // 팝업으로 표시할 드론 정보
  const popupRef = useRef();

  const searchTerm = watch("search") || "";

  // 검색을 적용한 드론 리스트 필터링
  const filteredDronsList = droneList.filter((drone) =>
    drone.name.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  // 팝업 외부 클릭 시 닫기
  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setPopupDrone(null);
    }
  };

  useEffect(() => {
    if (popupDrone) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupDrone]);

  const handleDelete = async () => {
    try {
      await deleteDroneList();
      refetch();
    } catch (error) {
      console.error("Error deleting drones:", error);
    }
  };

  const handleItemClick = (droneId) => {
    // 드론 선택 기능 추가
    setSelectedDroneId((prevId) => (prevId === droneId ? null : droneId));

    // 선택한 드론 정보 팝업으로 표시
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

      {popupDrone && (
        <PopupOverlay>
          <PopupContainer ref={popupRef}>
            <PopupContent>
              <Title>{popupDrone.name}</Title>
              <PopupField>
                <span>Drone ID:</span>
                <span>{popupDrone.droneId}</span>
              </PopupField>
              <PopupField>
                <span>Class:</span>
                <span>{popupDrone.class_name}</span>
              </PopupField>
              <PopupField>
                <span>Frequency:</span>
                <span>{popupDrone.frequency}</span>
              </PopupField>
              <PopupField>
                <span>Bandwidth:</span>
                <span>{popupDrone.bandwidth}</span>
              </PopupField>
              <PopupField>
                <span>Radio Resources:</span>
                <span>{popupDrone.radio_resources}</span>
              </PopupField>
              <PopupField>
                <span>Allow Takeover:</span>
                <span>{popupDrone.allow_takeover ? "Yes" : "No"}</span>
              </PopupField>
              <PopupField>
                <span>Allow Track:</span>
                <span>{popupDrone.allow_track ? "Yes" : "No"}</span>
              </PopupField>
              <PopupField>
                <span>Created At:</span>
                <span>{new Date(popupDrone.createdAt).toLocaleString()}</span>
              </PopupField>
              <PopupField>
                <span>Updated At:</span>
                <span>{new Date(popupDrone.updatedAt).toLocaleString()}</span>
              </PopupField>
            </PopupContent>
          </PopupContainer>
        </PopupOverlay>
      )}
    </MainContainer>
  );
}
