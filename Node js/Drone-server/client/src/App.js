import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import "./App.css"; // App.css 파일을 추가합니다.

// 드론 아이콘 이미지 URL
const droneIconUrl = `${process.env.PUBLIC_URL}/drone_1.png`;

// 커스텀 마커 아이콘 설정
const customIcon = (isLatest) =>
  new L.Icon({
    iconUrl: droneIconUrl,
    iconSize: [40, 40], // 드론 아이콘 크기 (적절히 조정)
    iconAnchor: [20, 20], // 아이콘의 앵커 위치 (아이콘의 중앙을 기준으로 위치)
    popupAnchor: [1, -34], // 팝업의 앵커 위치
    className: isLatest ? "marker-latest" : "marker-past", // 마커 스타일 클래스 설정
  });

const MapController = ({ latestPosition, autoCenter }) => {
  const map = useMap();

  useEffect(() => {
    if (autoCenter && latestPosition) {
      map.setView(
        [latestPosition.latitude, latestPosition.longitude],
        map.getZoom()
      );
    }
  }, [latestPosition, autoCenter, map]);

  return null;
};

function App() {
  const [positions, setPositions] = useState([]);
  const [latestPosition, setLatestPosition] = useState(null);
  const [autoCenter, setAutoCenter] = useState(true);

  useEffect(() => {
    // 서버에서 드론 위치 데이터 가져오기
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/positions"); // 서버의 엔드포인트에 요청
        setPositions(res.data);
        setLatestPosition(res.data[0]); // 가장 최신 위치를 최신 위치 상태에 저장
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

  const handleCenterLatestPosition = () => {
    if (latestPosition) {
      // 버튼 클릭 시 최신 위치로 이동
      setLatestPosition(latestPosition);
      setAutoCenter(false); // 수동 이동 시 자동 중앙 이동 비활성화
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
        <MapContainer
          center={[37.5665, 126.978]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {positions.map((position, index) => (
            <React.Fragment key={position.droneId}>
              <Marker
                position={[position.latitude, position.longitude]}
                icon={customIcon(index === 0)} // 최신 데이터는 진한 마커, 나머지는 흐릿한 마커
              >
                <Popup>
                  Drone ID: {position.droneId}
                  <br />
                  Latitude: {position.latitude}
                  <br />
                  Longitude: {position.longitude}
                </Popup>
              </Marker>
              {index === 0 && (
                <Circle
                  center={[position.latitude, position.longitude]}
                  radius={100} // 드론 위치의 반경을 표시하는 원
                  color="blue"
                  fillColor="blue"
                  fillOpacity={0.2} // 흐릿한 색상
                />
              )}
            </React.Fragment>
          ))}
          {/* 최신 위치로 이동시키기 위한 MapController 추가 */}
          <MapController
            latestPosition={latestPosition}
            autoCenter={autoCenter}
          />
        </MapContainer>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>드론을 추적하고 있습니다</h2>
        <button onClick={handleToggleAutoCenter}>
          {autoCenter ? "자동 위치 추적 끄기" : "자동 위치 추적 켜기"}
        </button>
        <button onClick={handleCenterLatestPosition}>최근 위치로 이동</button>
      </div>
    </div>
  );
}

export default App;
