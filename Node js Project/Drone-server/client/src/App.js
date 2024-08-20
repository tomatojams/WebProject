import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import "./App.css"; // App.css 파일을 추가합니다.

// 드론 아이콘 이미지 URL
const droneIconUrl = `${process.env.PUBLIC_URL}/drone_1.png`;

// 커스텀 드론 아이콘 설정
const customIcon = (isLatest, droneIndex) =>
  new L.Icon({
    iconUrl: droneIconUrl,
    iconSize: [30, 30], // 드론 아이콘 크기 (적절히 조정)
    iconAnchor: [15, 15], // 아이콘의 앵커 위치 (아이콘의 중앙을 기준으로 위치)
    popupAnchor: [1, -34], // 팝업의 앵커 위치
    className: `marker-${isLatest ? "latest" : "past"} marker-drone-${droneIndex}`, // 드론별 스타일 클래스 설정
  });

// 드론 이름을 아이콘 아래에 표시하기 위한 함수
const nameIcon = (name) =>
  L.divIcon({
    className: "custom-marker-label",
    html: `<div>${name}</div>`,
    iconSize: [50, 15], // 이름 표시 크기
    iconAnchor: [30, -10], // 이름 표시의 앵커 위치
  });

const MapController = ({ latestPositions, autoCenter, onMapReady }) => {
  const map = useMap();

  useEffect(() => {
    if (onMapReady) {
      onMapReady(map); // 지도 객체를 부모 컴포넌트에 전달
    }
  }, [map, onMapReady]);

  useEffect(() => {
    if (autoCenter && latestPositions.length > 0) {
      // 두 드론의 중간 지점을 계산
      const latitudes = latestPositions.map((pos) => pos.latitude);
      const longitudes = latestPositions.map((pos) => pos.longitude);
      const centerLat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2;
      const centerLon = (Math.max(...longitudes) + Math.min(...longitudes)) / 2;

      map.setView([centerLat, centerLon], map.getZoom());
    }
  }, [latestPositions, autoCenter, map]);

  return null;
};

function App() {
  const [positions, setPositions] = useState([]);
  const [latestPositions, setLatestPositions] = useState([]);
  const [autoCenter, setAutoCenter] = useState(true);
  const [map, setMap] = useState(null);
  const [selectedDrone, setSelectedDrone] = useState(null); // 선택된 드론의 정보

  useEffect(() => {
    // 서버에서 드론 위치 데이터 가져오기
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/positions"); // 서버의 엔드포인트에 요청
        setPositions(res.data);

        // 가장 최신 위치를 드론별로 그룹화
        const groupedPositions = res.data.reduce((acc, position) => {
          acc[position.droneId] = position;
          return acc;
        }, {});

        setLatestPositions(Object.values(groupedPositions));
        console.log("Fetched drone positions:", res.data); // 콘솔에 위치 데이터 출력
      } catch (error) {
        console.error("Error fetching drone positions:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000); // 2초마다 데이터 갱신

    return () => clearInterval(interval);
  }, []);

  const handleToggleAutoCenter = () => {
    setAutoCenter((prev) => !prev); // 자동 중앙 이동 토글
  };

  const handleCenterLatestPosition = useCallback(() => {
    if (map && latestPositions.length > 0) {
      // 버튼 클릭 시 최신 위치로 이동
      const latitudes = latestPositions.map((pos) => pos.latitude);
      const longitudes = latestPositions.map((pos) => pos.longitude);
      const centerLat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2;
      const centerLon = (Math.max(...longitudes) + Math.min(...longitudes)) / 2;

      setAutoCenter(false); // 수동 이동 시 자동 중앙 이동 비활성화
      map.setView([centerLat, centerLon], map.getZoom()); // 중간 지점으로 이동
    }
  }, [map, latestPositions]);

  // 드론 클릭 시 정보 요청 함수
  const handleMarkerClick = async (droneId) => {
    try {
      const res = await axios.get(`/api/drone/${droneId}`); // 드론 ID를 서버로 전송하여 추가 정보 요청
      setSelectedDrone(res.data); // 추가 정보를 상태로 저장
      console.log("Drone details:", res.data); // 콘솔에 추가 정보 출력
    } catch (error) {
      console.error("Error fetching drone details:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}>
      <div style={{ height: "500px", width: "500px", margin: "auto" }}>
        {/* 서울 중심으로 지도 설정, 초기 줌 레벨을 높여서 자세히 볼 수 있게 설정 */}
        <MapContainer center={[37.5665, 126.978]} zoom={15} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {latestPositions.map((position, index) => (
            <React.Fragment key={position.droneId}>
              <Marker
                position={[position.latitude, position.longitude]}
                icon={customIcon(true, index)}
                eventHandlers={{
                  click: () => handleMarkerClick(position.droneId), // 드론 클릭 시 핸들러 호출
                }}>
                {/* 팝업 제거 */}
              </Marker>
              <Marker
                position={[position.latitude, position.longitude]}
                icon={nameIcon(position.name)}
                opacity={0.7} // 이름이 드론 아이콘 아래에 위치하도록 하기 위해 낮은 불투명도 적용
              />
              <Circle
                center={[position.latitude, position.longitude]}
                radius={50} // 드론 위치의 반경을 표시하는 원
                color="blue"
                fillColor="blue"
                fillOpacity={0.2} // 흐릿한 색상
              />
            </React.Fragment>
          ))}
          {/* 최신 위치로 이동시키기 위한 MapController 추가 */}
          <MapController
            latestPositions={latestPositions}
            autoCenter={autoCenter}
            onMapReady={setMap} // 지도 객체를 상태로 저장
          />
        </MapContainer>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>드론을 추적하고 있습니다</h2>
        <button onClick={handleToggleAutoCenter}>{autoCenter ? "자동 위치 추적 끄기" : "자동 위치 추적 켜기"}</button>
        <button onClick={handleCenterLatestPosition}>최근 위치로 이동</button>
        {selectedDrone && (
          <div style={{ marginTop: "20px" }}>
            <h3>드론 상세 정보</h3>
            <p>
              <strong>Drone ID:</strong> {selectedDrone.droneId}
            </p>{" "}
            {/* 드론 ID 표시 */}
            <p>
              <strong>Message:</strong> {selectedDrone.message}
            </p>
            <p>
              <strong>Name:</strong> {selectedDrone.drone.name}
            </p>
            <p>
              <strong>Frequency:</strong> {selectedDrone.drone.frequency}
            </p>
            <p>
              <strong>Bandwidth:</strong> {selectedDrone.drone.bandwidth}
            </p>
            <p>
              <strong>Allow Track:</strong> {selectedDrone.drone.allow_track ? "Yes" : "No"}
            </p>
            <p>
              <strong>Allow Takeover:</strong> {selectedDrone.drone.allow_takeover ? "Yes" : "No"}
            </p>
            <p>
              <strong>Class Name:</strong> {selectedDrone.drone.class_name}
            </p>
            <p>
              <strong>Radio Resources:</strong> {selectedDrone.drone.radio_resources}
            </p>
            <p>
              <strong>Latitude:</strong> {selectedDrone.drone.latitude}
            </p>
            <p>
              <strong>Longitude:</strong> {selectedDrone.drone.longitude}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
