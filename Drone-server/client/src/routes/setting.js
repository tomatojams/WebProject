import AppHeader from "../components/nav";
import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";

const Frame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 50px;
`;

const SensorCard = styled.div`
  width: 100%;
  margin-top: 25px;
  margin-left: 25px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.1);
  position: relative;

  padding-bottom: 20px;
  color: #555555;
`;
// Card 스타일
const DroneCard = styled.div`
  width: 500px;
  margin: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-top: 100px;
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

// DroneImage 스타일
const DroneImage = styled.div`
  position: absolute;
  top: 60px;
  left: 20px;
  width: 100px;
  height: 100px;
  background-image: url(${(props) => `${process.env.PUBLIC_URL}/drones/${props.droneName}.jpg`});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;

// DroneInfo 스타일
const DroneInfo = styled.div`
  position: absolute;
  top: 60px;
  left: 180px;
  display: flex;
  gap: 15px;
  flex-direction: column;
`;

// DroneDetail 스타일
const DroneDetail = styled.div`
  width: 100%;
  margin-top: 70px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const DroneDetailCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// 버튼 스타일
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
  padding: 0 15px;
`;

const ToggleButton = styled.button`
  padding: 3px 0px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #bacce4;
  border-radius: 5px;
  font-weight: 500;
  background-color: ${(props) => (props.isActive ? "#667589" : "#f1f5f9")};
  color: ${(props) => (props.isActive ? "white" : "#667589")};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
`;

export default function Setting({ selectedDroneData }) {
  const [droneStates, setDroneStates] = useState({});

  // 드론의 특정 상태를 변경하는 함수
  const toggleDroneState = (droneId, stateKey) => {
    setDroneStates((prevState) => ({
      ...prevState,
      [droneId]: {
        ...prevState[droneId],
        [stateKey]: !prevState[droneId]?.[stateKey],
      },
    }));
  };

  // 서버로 드론 제어 명령을 전송하는 함수
  const sendControlCommand = async (droneId, enumType, isActive) => {
    try {
      const command = isActive ? "stop" : "start";
      const response = await axios.post("/api/drone/control", {
        droneId: droneId,
        enum: enumType,
        command: command,
      });
      console.log("Command sent:", response.data);
    } catch (error) {
      console.error("Error sending command:", error);
    }
  };
  return (
    <>
      <AppHeader></AppHeader>
      <Frame>
        <SensorCard>
          <Title>SONSOR SETTING</Title>
        </SensorCard>
        <DroneCard>
          <Title>DRONE INFO</Title>
          {selectedDroneData && (
            <>
              <DroneImage
                droneName={selectedDroneData.drone.name.replace(/\s+/g, "_").toLowerCase()}
              />
              <DroneInfo>
                <p>
                  <strong>Drone ID:</strong>
                  <br />
                  <p className="info-drone-value-highlight">{selectedDroneData.drone.droneId}</p>
                </p>
                <p>
                  <strong>Name:</strong>
                  <br />
                  <p className="info-drone-status-yes">{selectedDroneData.drone.name}</p>
                </p>
              </DroneInfo>
            </>
          )}
          {selectedDroneData ? (
            <>
              <DroneDetail>
                <DroneDetailCol>
                  <p>
                    <strong>Frequency:</strong>
                    <br />
                    {selectedDroneData.drone.frequency}
                  </p>
                  <p>
                    <strong>Bandwidth:</strong>
                    <br />
                    {selectedDroneData.drone.bandwidth}
                  </p>
                </DroneDetailCol>
                <DroneDetailCol>
                  <p>
                    <strong>Latitude:</strong>
                    <br />
                    {selectedDroneData.drone.location.latitude}
                  </p>
                  <p>
                    <strong>Longitude:</strong>
                    <br />
                    {selectedDroneData.drone.location.longitude}
                  </p>
                </DroneDetailCol>
              </DroneDetail>
              <ButtonGroup></ButtonGroup>
            </>
          ) : (
            <p className="info-drone-placeholder">드론을 선택해 주세요.</p>
          )}
        </DroneCard>
      </Frame>
    </>
  );
}
