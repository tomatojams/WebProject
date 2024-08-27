import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useQuery } from "react-query";

import InfoDrone from "./components/info";
import DroneList from "./components/droneList";
import CustomMark from "./components/customMark";
import MapBox from "./components/mapBox";
import AppHeader from "./components/nav"; // AppHeader 컴포넌트 임포트
import { fetchDronePositions } from "./components/api";

function App() {
  const [selectedDroneData, setSelectedDroneData] = useState(null);
  const [filteredDrons, setFilteredDrons] = useState([]);
  const [customMarkers, setCustomMarkers] = useState([]);

  // 리액트 쿼리를 사용하여 주기적으로 드론 위치 데이터를 가져옴
  const {
    data: latestPositions,
    isLoading,
    error,
  } = useQuery(["dronePositions"], fetchDronePositions, {
    refetchInterval: 1000,
  });

  // 리액트쿼리 에러처리
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching drone positions: {error.message}</div>;

  // 드론 선택시 데이터 페치
  const handleDroneSelect = async (droneId) => {
    try {
      const res = await axios.get(`/api/drone/${droneId}`);
      setSelectedDroneData(res.data);
    } catch (error) {
      console.error("Error fetching drone details:", error);
    }
  };

  // 드론 필터링
  const handleFilterDrone = (droneId) => {
    setFilteredDrons((prev) =>
      prev.includes(droneId) ? prev.filter((id) => id !== droneId) : [...prev, droneId]
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppHeader /> {/* 상단바 추가 */}
      <div style={{ display: "flex", flex: 1 }}>
        <MapBox 
          latestPositions={latestPositions}
          filteredDrons={filteredDrons}
          customMarkers={customMarkers}
          handleDroneSelect={handleDroneSelect}
        />
        <div style={{ width: "400px", display: "flex", flexDirection: "column" }}>
          <CustomMark setCustomMarkers={setCustomMarkers} />
          <DroneList
            latestPositions={latestPositions}
            handleDroneSelect={handleDroneSelect}
            handleFilterDrone={handleFilterDrone}
            filteredDrons={filteredDrons}
          />
          <InfoDrone selectedDroneData={selectedDroneData} />
        </div>
      </div>
    </div>
  );
}

export default App;
