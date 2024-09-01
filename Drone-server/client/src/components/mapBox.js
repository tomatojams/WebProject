import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import React, { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { selectedDroneState } from "../atom";
import { customCombinedIcon, getCustomMarkerIcon } from "./customIcon";
import { isDroneInEventRange } from "./calculate";

export default function MapBox({
  latestPositions,
  filteredDrons,
  customMarkers,
  handleDroneSelect,
  droneCount,
  setDroneCount,
  radius,
}) {
  const [selectedDroneId, setSelectedDroneId] = useRecoilState(selectedDroneState);
  const [autoCenter, setAutoCenter] = useState(true);

  const handleMarkerClick = async (droneId) => {
    setSelectedDroneId((prevId) => (prevId === droneId ? null : droneId));
    handleDroneSelect(droneId);
  };

  const handleToggleAutoCenter = () => {
    setAutoCenter((prev) => !prev);
  };

  const MapController = ({ latestPositions, autoCenter, filteredDrons }) => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

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
    }, [latestPositions, autoCenter, map, filteredDrons]);

    return null;
  };

  // `useCallback`을 사용하여 `countDronesInRange` 함수를 안정적으로 만듭니다.
  const countDronesInRange = useCallback(() => {
    let count = 0;
    latestPositions.forEach((position) => {
      if (isDroneInEventRange(position, customMarkers, radius)) {
        count += 1;
      }
    });
    setDroneCount(count);
  }, [latestPositions, customMarkers, radius, setDroneCount]);

  // `useEffect`에서 `countDronesInRange`를 호출하고 종속성 배열에 포함합니다.
  useEffect(() => {
    countDronesInRange();
  }, [radius, latestPositions, countDronesInRange]);

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

      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          padding: "5px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "4px",
        }}>
        Drones in Range: {droneCount}
      </div>

      <MapContainer className="h-full w-full" center={[37.5665, 126.978]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {latestPositions
          .filter((position) => !filteredDrons.includes(position.droneId))
          .map((position) => {
            const isInEventRange = isDroneInEventRange(position, customMarkers, radius);
            const isSelected = selectedDroneId === position.droneId;
            return (
              <React.Fragment key={position.droneId}>
                <Marker
                  position={[position.latitude, position.longitude]}
                  icon={customCombinedIcon(position.name, isSelected, isInEventRange)}
                  eventHandlers={{ click: () => handleMarkerClick(position.droneId) }}
                />
              </React.Fragment>
            );
          })}
        <MapController
          latestPositions={latestPositions}
          autoCenter={autoCenter}
          filteredDrons={filteredDrons}
        />
        {customMarkers.map((marker) => (
          <React.Fragment key={marker.id}>
            <Marker
              position={[marker.lat, marker.lon]}
              icon={getCustomMarkerIcon(marker.markType)}
            />
            <Circle
              center={[marker.lat, marker.lon]}
              radius={radius || 50}
              pathOptions={{
                color: "green",
                fillColor: "rgba(0, 255, 0, 0.2)",
                fillOpacity: 0.2,
              }}
            />
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
}
