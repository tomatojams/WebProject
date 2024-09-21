import styled from "styled-components";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useQuery } from "react-query";

import InfoDrone from "../components/info";
import DroneList from "../components/droneList";
import EventRadius from "../components/eventRadius";
import MapBox from "../components/mapBox";
import AppHeader from "../components/nav";
import { fetchDronePositions, fetchMarkData } from "../components/api";

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

const Sidebar = styled.div`
  box-sizing: border-box;
  width: 400px;
  display: flex;
  flex-direction: column;
  background-color: #f9fbfd;
  padding: 10px;
`;

// 개별 드론 정보를 가져오는 함수
const fetchSelectedDroneData = async (droneId) => {
  const res = await axios.get(`/api/drone/${droneId}`);
  return res.data;
};

// 컴포넌트
export default function MainInfo() {
  const [selectedDroneId, setSelectedDroneId] = useState(null);
  const [filteredDrons, setFilteredDrons] = useState([]);
  const [customMarkers, setCustomMarkers] = useState([]);
  const [droneCount, setDroneCount] = useState(0);
  const [radius, setRadius] = useState(100); // 반경 상태 추가

  // 1초마다 드론 위치 업데이트
  const { data: latestPositions = [] } = useQuery(["dronePositions"], fetchDronePositions, {
    refetchInterval: 1000,
  });

  // 6초마다 센서 마크 데이터 업데이트
  const { data: sensorMark = [] } = useQuery(["markData"], fetchMarkData, {
    refetchInterval: 6000,
  });

  // 선택된 드론 정보 실시간 업데이트
  const { data: selectedDroneData } = useQuery(
    ["selectedDroneData", selectedDroneId],
    () => fetchSelectedDroneData(selectedDroneId),
    {
      enabled: !!selectedDroneId, // selectedDroneId가 있을 때만 쿼리 실행
      refetchInterval: 1000, // 1초마다 업데이트
    }
  );

  useEffect(() => {
    if (!sensorMark || !sensorMark.lat || !sensorMark.lon || !sensorMark.id) {
      return;
    }
    const newMarker = {
      id: sensorMark.id,
      lat: parseFloat(sensorMark.lat),
      lon: parseFloat(sensorMark.lon),
      markType: "mark1",
      state: sensorMark.state || "active",
    };

    setCustomMarkers(() => [newMarker]);
  }, [sensorMark]);

  const handleDroneSelect = (droneId) => {
    setSelectedDroneId(droneId); // 드론 선택 시 ID 업데이트
  };

  const handleFilterDrone = (droneId) => {
    setFilteredDrons((prev) =>
      prev.includes(droneId) ? prev.filter((id) => id !== droneId) : [...prev, droneId]
    );
  };

  return (
    <MainContainer>
      <AppHeader />
      <ContentWrapper>
        {latestPositions && (
          <MapBox
            latestPositions={latestPositions}
            filteredDrons={filteredDrons}
            customMarkers={customMarkers}
            handleDroneSelect={handleDroneSelect}
            droneCount={droneCount}
            setDroneCount={setDroneCount}
            radius={radius} // 반경 전달
            setRadius={setRadius} // 반경 조절 함수 전달
          />
        )}
        <Sidebar>
          {latestPositions && (
            <>
              <EventRadius
                setCustomMarkers={setCustomMarkers}
                droneCount={droneCount}
                radius={radius} // 반경 전달
                setRadius={setRadius} // 반경 조절 함수 전달
              />
              <DroneList
                latestPositions={latestPositions}
                handleDroneSelect={handleDroneSelect}
                handleFilterDrone={handleFilterDrone}
                filteredDrons={filteredDrons}
              />
              <InfoDrone selectedDroneData={selectedDroneData} />
            </>
          )}
        </Sidebar>
      </ContentWrapper>
    </MainContainer>
  );
}
