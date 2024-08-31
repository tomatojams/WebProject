import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import { useRecoilState } from "recoil";
import { selectedDroneState } from "../atom";

export default function MapBox({
  latestPositions,
  filteredDrons,
  customMarkers,
  handleDroneSelect,
}) {
  const [selectedDroneId, setSelectedDroneId] = useRecoilState(selectedDroneState);
  const [autoCenter, setAutoCenter] = useState(true);
  const droneIconUrl = `${process.env.PUBLIC_URL}/drone_2.png`;
  const droneIconRedUrl = `${process.env.PUBLIC_URL}/drone_2_red.png`; // 추가된 빨간 드론 아이콘

  const handleMarkerClick = async (droneId) => {
    setSelectedDroneId((prevId) => (prevId === droneId ? null : droneId));
    handleDroneSelect(droneId);
  };

  const handleToggleAutoCenter = () => {
    setAutoCenter((prev) => !prev);
  };

  const MapController = ({ latestPositions, autoCenter, filteredDrons }) => {
    const map = useMap(); // map 객체 가져오기

    useEffect(() => {
      if (!map) return; // map이 정의되지 않은 경우 빠져나오기

      if (autoCenter && latestPositions.length > 0) {
        const positionsToConsider = latestPositions.filter(
          (pos) => !filteredDrons.includes(pos.droneId)
        );

        if (positionsToConsider.length > 0) {
          const latitudes = positionsToConsider.map((pos) => pos.latitude);
          const longitudes = positionsToConsider.map((pos) => pos.longitude);
          const centerLat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2;
          const centerLon = (Math.max(...longitudes) + Math.min(...longitudes)) / 2;

          map.setView([centerLat, centerLon], map.getZoom());
        }
      }

      // 각 드론의 위치에 따라 원의 위치 업데이트
    }, [latestPositions, autoCenter, map, filteredDrons]);

    return null;
  };

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

  const customCombinedIcon = (name, isSelected) =>
    L.divIcon({
      className: "custom-marker-icon",
      html: `
        <div class="base-icon">
          <img src="${isSelected ? droneIconRedUrl : droneIconUrl}" alt="Drone" />
        </div>
        <div class="animated-icon" style="transform: translateX(-10px) translateY(50px);">
          <div class="custom-marker-label" style="width: 80px; text-align: center;">
            ${name}
          </div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [20, 20],
    });

  return (
    <div className="p-5 h-full w-full relative">
      <button
        style={{
          position: "absolute",
          bottom: "50px",
          right: "30px",
          zIndex: 1000,
          padding: "5px 10px",
          backgroundColor: autoCenter ? "green" : "blue",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          width: "140px",
          boxSizing: "border-box",
        }}
        onClick={handleToggleAutoCenter}>
        {autoCenter ? "Auto-Center ON" : "Auto-Center OFF"}
      </button>

      <MapContainer className="h-full w-full" center={[37.5665, 126.978]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {latestPositions
          .filter((position) => !filteredDrons.includes(position.droneId))
          .map((position) => (
            <React.Fragment key={position.droneId}>
              <Marker
                position={[position.latitude, position.longitude]}
                icon={customCombinedIcon(position.name, selectedDroneId === position.droneId)} // 드론이 선택되었는지 확인하여 아이콘 설정
                eventHandlers={{ click: () => handleMarkerClick(position.droneId) }}
              />
            </React.Fragment>
          ))}
        <MapController
          latestPositions={latestPositions}
          autoCenter={autoCenter}
          filteredDrons={filteredDrons}
        />
        {customMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.lat, marker.lon]}
            icon={getMarkIcon(marker.markType)}
          />
        ))}
      </MapContainer>
    </div>
  );
}
