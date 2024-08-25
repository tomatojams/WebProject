import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { useRecoilState } from "recoil";
import { selectedDroneState } from "../atom";

export default function MapBox({ latestPositions, filteredDrons, customMarkers, handleDroneSelect }) {
  // Recoil을 통해 선택된 드론 ID를 가져옴
  const [selectedDroneId, setSelectedDroneId] = useRecoilState(selectedDroneState);
  // autoCenter 상태를 관리하기 위한 useState 추가
  const [autoCenter, setAutoCenter] = useState(true);

  // 드론 아이콘 이미지 URL
  const droneIconUrl = `${process.env.PUBLIC_URL}/drone_1.png`;

  // 클릭된 드론 ID가 현재 선택된 드론과 같으면 선택 해제, 아니면 선택
  const handleMarkerClick = async (droneId) => {
    setSelectedDroneId((prevId) => (prevId === droneId ? null : droneId));
    handleDroneSelect(droneId); // 드론을 선택할 때 호출
  };

  // 자동 중앙 정렬 토글
  const handleToggleAutoCenter = () => {
    setAutoCenter((prev) => !prev);
  };

  const MapController = ({ latestPositions, autoCenter, filteredDrons }) => {
    const map = useMap();

    useEffect(() => {
      if (autoCenter && latestPositions.length > 0) {
        const positionsToConsider = latestPositions.filter((pos) => !filteredDrons.includes(pos.droneId));

        if (positionsToConsider.length > 0) {
          const latitudes = positionsToConsider.map((pos) => pos.latitude);
          const longitudes = positionsToConsider.map((pos) => pos.longitude);
          const centerLat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2;
          const centerLon = (Math.max(...longitudes) + Math.min(...longitudes)) / 2;

          map.setView([centerLat, centerLon], map.getZoom());
        }
      }
    }, [latestPositions, autoCenter, map, filteredDrons]);

    return null;
  };

  // 마크 아이콘 설정
  const getMarkIcon = (markType) => {
    const icons = {
      mark1: `${process.env.PUBLIC_URL}/mark1.png`,
      mark2: `${process.env.PUBLIC_URL}/mark2.png`,
      mark3: `${process.env.PUBLIC_URL}/mark3.png`,
      mark4: `${process.env.PUBLIC_URL}/mark4.png`,
    };
    return new L.Icon({
      iconUrl: icons[markType] || droneIconUrl,
      iconSize: [30, 30],
    });
  };

  // 커스텀 드론 아이콘 설정
  const customIcon = (isLatest, droneIndex) =>
    new L.Icon({
      iconUrl: droneIconUrl,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [1, -34],
      className: `marker-${isLatest ? "latest" : "past"} marker-drone-${droneIndex}`,
    });

  // 드론 이름을 아이콘 아래에 표시하기 위한 함수
  const nameIcon = (name) =>
    L.divIcon({
      className: "custom-marker-label",
      html: `<div>${name}</div>`,
      iconSize: [50, 15],
      iconAnchor: [30, -15],
    });

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <button
        style={{
          position: "absolute",
          bottom: "30px",
          right: "10px",
          zIndex: 1000,
          padding: "5px 10px",
          backgroundColor: autoCenter ? "green" : "blue",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={handleToggleAutoCenter}>
        {autoCenter ? "Auto-Center ON" : "Auto-Center OFF"}
      </button>

      <MapContainer style={{ height: "100%", width: "100%" }} center={[37.5665, 126.978]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {latestPositions
          .filter((position) => !filteredDrons.includes(position.droneId))
          .map((position, index) => (
            <React.Fragment key={position.droneId}>
              <Marker
                position={[position.latitude, position.longitude]}
                icon={customIcon(true, index)}
                eventHandlers={{ click: () => handleMarkerClick(position.droneId) }}
              />
              <Marker
                eventHandlers={{ click: () => handleMarkerClick(position.droneId) }}
                position={[position.latitude, position.longitude]}
                icon={nameIcon(position.name)}
                opacity={0.7}
              />
              <Circle
                center={[position.latitude, position.longitude]}
                radius={50}
                color={selectedDroneId === position.droneId ? "red" : "green"}
                fillColor={selectedDroneId === position.droneId ? "red" : "green"}
                fillOpacity={0.2}
                eventHandlers={{ click: () => handleMarkerClick(position.droneId) }}
                key={
                  selectedDroneId === position.droneId
                    ? `selected-${position.droneId}`
                    : `unselected-${position.droneId}`
                }
              />
            </React.Fragment>
          ))}
        <MapController latestPositions={latestPositions} autoCenter={autoCenter} filteredDrons={filteredDrons} />
        {customMarkers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lon]} icon={getMarkIcon(marker.markType)} />
        ))}
      </MapContainer>
    </div>
  );
}
