import React, { useState } from "react";
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
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [mapOptions, setMapOptions] = useState({
    draggable: true,
    disableDefaultUI: true, // 기본 UI 비활성화
  });

  const handleMapClick = (event) => {
    if (selectedEmoji) {
      setMarkers((current) => [
        ...current,
        {
          position: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          },
          emoji: selectedEmoji,
        },
      ]);
      // 선택된 이모지 상태 초기화 및 커서 복구
      setSelectedEmoji(null);
      setMapOptions((prev) => ({
        ...prev,
        draggable: true,
        draggableCursor: "grab", // 기본 커서로 복구
      }));
      document.body.style.cursor = "default"; // 브라우저 커서 복구
    }
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    setMapOptions((prev) => ({
      ...prev,
      draggable: false,
      draggableCursor: `url(${createEmojiCursor(emoji)}), auto`, // Google Maps 커서 변경
    }));
    document.body.style.cursor = `url(${createEmojiCursor(emoji)}), auto`; // 브라우저 커서 변경
  };

  const createEmojiCursor = (emoji) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 64;
    canvas.height = 64;

    ctx.font = "48px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, 32, 32);

    return canvas.toDataURL();
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Container>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={18}
        options={mapOptions} // 지도 옵션 설정
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
          <EmojiButton key={index} onClick={() => handleEmojiClick(emoji)}>
            {emoji}
          </EmojiButton>
        ))}
      </EmojiSelector>
    </Container>
  );
}
