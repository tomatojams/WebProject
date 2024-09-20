import styled from "styled-components";
import React from "react";
import { useQueryClient } from "react-query";
import axios from "axios";

const SensorContainer = styled.div`
  margin: 20px 30px;
  padding: 20px 30px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const SensorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SensorTitle = styled.h3`
  color: #34c759;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.3em;
`;

const SensorDetails = styled.div`
  font-size: 14px;
  color: #555555;
`;

const RadiusWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RadiusIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #f9a825;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
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

const SensorCard = ({ sensor }) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      // 삭제 API 호출
      await axios.delete(`/api/sensor/${sensor.sensor_id}`);
      // 삭제 후 sensorList 쿼리 무효화하여 다시 로드
      queryClient.invalidateQueries("sensorList");
    } catch (error) {
      console.error("Error deleting sensor:", error);
    }
  };

  return (
    <SensorContainer>
      <SensorInfo>
        <SensorTitle>{sensor.sensor_id}</SensorTitle>

        <SimpleButton onClick={handleDelete}>초기화</SimpleButton>
      </SensorInfo>
      <RadiusWrapper>
        <RadiusIcon>📡</RadiusIcon>
        <div>
          <p>Radius: {sensor.radius} m</p>
        </div>
      </RadiusWrapper>
      <SensorDetails>
        <p>Registered at: {new Date(sensor.createdAt).toLocaleString()}</p>
        <p>Latitude: {sensor.latitude}</p>
        <p>Longitude: {sensor.longitude}</p>
      </SensorDetails>
    </SensorContainer>
  );
};

export default SensorCard;
