import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import axios from "axios";

import "./App.css";
import InfoDrone from "./components/info";
import DroneList from "./components/droneList";
import CustomMark from "./components/customMark";
import MapBox from "./components/mapBox";
import { useQuery } from "react-query";
import { fetchDronePositions } from "./components/api";

function App() {
  const [autoCenter, setAutoCenter] = useState(true);
  const [selectedDroneData, setSelectedDroneData] = useState(null);
  const [filteredDrons, setFilteredDrons] = useState([]);
  const [customMarkers, setCustomMarkers] = useState([]);

  // 리액트 쿼리를 사용하여 주기적으로 드론 위치 데이터를 가져옴
  // useEffect 와 비슷한 역할을 하고, useState를 안써도되며, 캐싱을 해주고, 주기적으로 데이터를 가져올 수 있음
  // 에러처리와 로딩상태를 제공함

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

  // 드론 선택시 데이타 페치
  const handleDroneSelect = async (droneId) => {
    try {
      const res = await axios.get(`/api/drone/${droneId}`);
      setSelectedDroneData(res.data);
    } catch (error) {
      console.error("Error fetching drone details:", error);
    }
  };

  // 자동 중앙 정렬 토글
  const handleToggleAutoCenter = () => {
    setAutoCenter((prev) => !prev);
  };

  // 드론 필터링
  const handleFilterDrone = (droneId) => {
    setFilteredDrons((prev) => (prev.includes(droneId) ? prev.filter((id) => id !== droneId) : [...prev, droneId]));
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <MapBox
        latestPositions={latestPositions}
        autoCenter={autoCenter}
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
        <InfoDrone
          autoCenter={autoCenter}
          selectedDroneData={selectedDroneData}
          handleToggleAutoCenter={handleToggleAutoCenter}
        />
      </div>
    </div>
  );
}

export default App;
