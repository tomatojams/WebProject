import React from "react";
import styled from "styled-components";

// Card 스타일
const Card = styled.div`
  width: 350px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-top: 100px; /* 이미지와 제목 사이 간격 확보 */
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

// DroneImage 스타일: selectedDroneData의 droneName에 따라 이미지를 동적으로 불러옴
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

// DroneInfo 스타일: 드론 ID와 이름을 이미지 오른쪽에 배치
const DroneInfo = styled.div`
  position: absolute;
  top: 60px;
  left: 180px; /* 이미지 오른쪽에 배치 */
  display: flex;
  flex-direction: column;
`;

// DroneDetail 스타일: 나머지 드론 정보를 하단에 배치
const DroneDetail = styled.div`
  width: 100%;
  margin-top: 70px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

export default function InfoDrone({ selectedDroneData }) {
  return (
    <Card>
      <Title>DRONE INFO</Title>
      {selectedDroneData && (
        <>
          <DroneImage droneName={selectedDroneData.drone.name.replace(/\s+/g, "_").toLowerCase()} />
          <DroneInfo>
            <p>
              <strong>Drone ID:</strong>
              <br />
              <p className="info-drone-value-highlight">{selectedDroneData.drone.droneId}</p>
            </p>
            <p>
              <strong>Name:</strong>
              <br />
              <p className="info-drone-status-yes"> {selectedDroneData.drone.name}</p>
            </p>
          </DroneInfo>
        </>
      )}
      {selectedDroneData ? (
        <DroneDetail>
          <div>
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
          </div>
          <div>
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
          </div>
        </DroneDetail>
      ) : (
        <p className="info-drone-placeholder">드론을 선택해 주세요.</p>
      )}
    </Card>
  );
}
