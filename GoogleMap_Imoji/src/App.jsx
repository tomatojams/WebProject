import React, { useState, useCallback } from "react";
import { GoogleMap, OverlayView, useLoadScript } from "@react-google-maps/api";
import styled from "styled-components";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const Container = styled.div`
  width: 400px;
  height: 900px;
  position: relative;
  margin: 50px 50px;
  display: flex;
  justify-content: center;
`;

const center = {
  lat: 37.5665, // 서울 시청
  lng: 126.978,
};

const emojis = ["😊", "📍", "🏠", "🌟", "❤️", "⭐", "🐤"];

const EmojiSelector = styled.div`
  position: absolute;
  width: 98%;
  flex-wrap: wrap;
  bottom: 0px;
  display: flex;
  gap: 10px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
`;

const EmojiButton = styled.div`
  font-size: 45px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const EmojiMarker = styled.div`
  position: absolute;
  font-size: 24px;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

export default function App() {
  const { VITE_GOOGLE_MAPS_API_KEY } = import.meta.env;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: VITE_GOOGLE_MAPS_API_KEY,
  });

  const [markers, setMarkers] = useState([]);
  const [draggingEmoji, setDraggingEmoji] = useState(null);

  const handleMapClick = useCallback(
    (event) => {
      if (draggingEmoji) {
        setMarkers((current) => [
          ...current,
          {
            position: {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            },
            emoji: draggingEmoji,
          },
        ]);
        setDraggingEmoji(null);
      }
    },
    [draggingEmoji]
  );

  const handleDragStart = (emoji) => {
    setDraggingEmoji(emoji);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Container>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={18}
        onClick={handleMapClick}>
        {markers.map((marker, index) => (
          <OverlayView
            key={index}
            position={marker.position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <EmojiMarker>{marker.emoji}</EmojiMarker>
          </OverlayView>
        ))}
      </GoogleMap>

      <EmojiSelector>
        {emojis.map((emoji, index) => (
          <EmojiButton key={index} draggable onDragStart={() => handleDragStart(emoji)}>
            {emoji}
          </EmojiButton>
        ))}
      </EmojiSelector>
    </Container>
  );
}
