import styled from "styled-components";
import React, { useState } from "react";
// import { useQueryClient } from "react-query";
// import axios from "axios";

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
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  color: #555555;
`;

const RadiusWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RadiusIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #fce2f3;
  border-radius: 50%;
  display: flex;
  background-image: url(${process.env.PUBLIC_URL}/icon/sensor_icon.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80%;
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

const RadiusInput = styled.input`
  width: 60px;
  padding: 5px;
  margin-left: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;

  &:focus {
    outline: none;
  }
`;

const SensorCard = ({ sensor }) => {
  // 자식컴포넌트가 부모컴포넌트를 업데이트 하기위해서
  // const queryClient = useQueryClient();
  const [radius, setRadius] = useState(sensor.radius); // 반경 상태 추가

  // 반경 업데이트 핸들러
  const handleRadiusUpdate = async () => {
    try {
      // 반경 값이 숫자 타입인지 확인하고 요청
      const parsedRadius = Number(radius);
      if (isNaN(parsedRadius) || parsedRadius <= 0) {
        console.error("Invalid radius value");
        return; // 반경 값이 유효하지 않으면 요청하지 않음
      }

      // await axios.put(`/api/sensor/${sensor.sensor_id}`, { radius: parsedRadius });
      // queryClient.invalidateQueries("sensorList"); // 업데이트 후 센서 리스트를 다시 로드
    } catch (error) {
      console.error("Error updating radius:", error);
    }
  };

  // 센서 삭제 핸들러
  const handleDelete = async () => {
    try {
      // await axios.delete(`/api/sensor/${sensor.sensor_id}`);
      // queryClient.invalidateQueries("sensorList");
    } catch (error) {
      console.error("Error deleting sensor:", error);
    }
  };

  return (
    <SensorContainer>
      <SensorInfo>
        <SensorTitle>{sensor.sensor_id}</SensorTitle>
        <SimpleButton onClick={handleDelete}>Demo</SimpleButton>
      </SensorInfo>
      <RadiusWrapper>
        <RadiusIcon />
        <div>
          <label>Radius: </label>
          <RadiusInput
            type="number"
            value={radius}
            onChange={(e) => setRadius(e.target.value)} // 반경 값 변경
          />{" "}
          m<SimpleButton onClick={handleRadiusUpdate}>Demo</SimpleButton>
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
