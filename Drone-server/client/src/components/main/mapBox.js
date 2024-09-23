import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import { useRecoilState } from "recoil";
import { selectedDroneState } from "../../atom";
import { customCombinedIcon, getCustomMarkerIcon } from "./customIcon";
import { isDroneInEventRange } from "./calculate";
import styled from "styled-components";

const Card = styled.div`
  width: 100%;

  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  padding: 20px;
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.1);
`;

export default function MapBox({
  latestPositions,
  filteredDrons,
  customMarkers,
  setDroneCount,
  radius,
}) {
  const [selectedDroneId, setSelectedDroneId] = useRecoilState(selectedDroneState);
  const [autoCenter, setAutoCenter] = useState(true);

  const handleMarkerClick = async (droneId) => {
    setSelectedDroneId((prevId) => (prevId === droneId ? null : droneId));
  };

  const handleToggleAutoCenter = () => {
    setAutoCenter((prev) => !prev);
  };

  const MapController = ({ customMarkers, autoCenter }) => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      // autoCenter가 켜져 있고 센서가 존재할 경우 센서들의 중앙 좌표로 이동
      if (autoCenter && customMarkers.length > 0) {
        const latitudes = customMarkers.map((marker) => marker.lat);
        const longitudes = customMarkers.map((marker) => marker.lon);
        const centerLat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2;
        const centerLon = (Math.max(...longitudes) + Math.min(...longitudes)) / 2;

        map.setView([centerLat, centerLon], map.getZoom());
      }
    }, [customMarkers, autoCenter, map]);

    return null;
  };

  const countDronesInRange = useCallback(() => {
    let count = 0;
    latestPositions.forEach((position) => {
      if (isDroneInEventRange(position, customMarkers, radius)) {
        count += 1;
      }
    });
    setDroneCount(count);
  }, [latestPositions, customMarkers, radius, setDroneCount]);

  useEffect(() => {
    countDronesInRange();
  }, [radius, latestPositions, countDronesInRange]);

  return (
    <Card>
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

      <MapContainer className="h-full w-full" center={[37.5665, 126.978]} zoom={18}>
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
        <MapController customMarkers={customMarkers} autoCenter={autoCenter} />
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
    </Card>
  );
}
