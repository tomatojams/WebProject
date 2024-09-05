// App.js

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useQuery } from "react-query";

import InfoDrone from "./components/info";
import DroneList from "./components/droneList";
import CustomMark from "./components/customMark";
import MapBox from "./components/mapBox";
import AppHeader from "./components/nav";
import { fetchDronePositions, fetchMarkData } from "./components/api";

function App() {
  const [selectedDroneData, setSelectedDroneData] = useState(null);
  const [filteredDrons, setFilteredDrons] = useState([]);
  const [customMarkers, setCustomMarkers] = useState([]);
  const [droneCount, setDroneCount] = useState(0);
  const [radius, setRadius] = useState(100); // 반경 상태 추가

  const { data: latestPositions = [] } = useQuery(["dronePositions"], fetchDronePositions, {
    refetchInterval: 1000,
  });

  const { data: sensorMark = [] } = useQuery(["markData"], fetchMarkData, { refetchInterval: 6000 });

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

  const handleDroneSelect = async (droneId) => {
    try {
      const res = await axios.get(`/api/drone/${droneId}`);
      setSelectedDroneData(res.data);
    } catch (error) {
      console.error("Error fetching drone details:", error);
    }
  };

  const handleFilterDrone = (droneId) => {
    setFilteredDrons((prev) =>
      prev.includes(droneId) ? prev.filter((id) => id !== droneId) : [...prev, droneId]
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppHeader />
      <div style={{ display: "flex", flex: 1 }}>
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
        <div style={{ width: "400px", display: "flex", flexDirection: "column" }}>
          {latestPositions && (
            <>
              <CustomMark
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
        </div>
      </div>
    </div>
  );
}

export default App;
