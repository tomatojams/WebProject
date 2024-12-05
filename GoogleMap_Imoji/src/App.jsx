import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
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

export default function App() {
  const { VITE_GOOGLE_MAPS_API_KEY } = import.meta.env;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: VITE_GOOGLE_MAPS_API_KEY,
  });

  const [markers, setMarkers] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [mapRef, setMapRef] = useState(null);

  const onMapLoad = useCallback((map) => {
    setMapRef(map);
  }, []);

  const handleMapClick = useCallback(
    (event) => {
      if (selectedEmoji && mapRef) {
        const newMarker = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          emoji: selectedEmoji,
          id: Date.now(), // 고유 ID 추가
        };

        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        setSelectedEmoji(null);
      }
    },
    [selectedEmoji, mapRef]
  );

  const handleDragStart = (emoji) => {
    setSelectedEmoji(emoji);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Container>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={18}
        onLoad={onMapLoad}
        onClick={handleMapClick}>
        {markers.map((marker) => (
          <Marker
            key={marker.id} // 고유 키 사용
            position={{ lat: marker.lat, lng: marker.lng }}
            label={{
              text: marker.emoji,
              fontSize: "24px",
            }}
          />
        ))}
      </GoogleMap>

      <EmojiSelector>
        {emojis.map((emoji, index) => (
          <EmojiButton key={index} onMouseDown={() => handleDragStart(emoji)}>
            {emoji}
          </EmojiButton>
        ))}
      </EmojiSelector>
    </Container>
  );
}
