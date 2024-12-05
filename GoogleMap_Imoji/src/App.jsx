import { useState, useRef, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Container, EmojiSelector, EmojiButton } from "./component/styled.js";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 37.5665, // 서울 시청
  lng: 126.978,
};

const emojis = ["😊", "📍", "🏠", "🌟", "❤️", "⭐", "🐤"];

export default function App() {
  const { VITE_GOOGLE_MAPS_API_KEY } = import.meta.env;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: VITE_GOOGLE_MAPS_API_KEY,
  });

  const [markers, setMarkers] = useState([]);
  const [draggingEmoji, setDraggingEmoji] = useState(null); // 드래그 중인 이모지 저장
  const mapContainerRef = useRef(null); // Google Map 컨테이너
  const mapRef = useRef(null); // Google Map 객체

  const handleDragStart = (emoji) => () => {
    setDraggingEmoji(emoji); // 드래그 시작 시 선택된 이모지 저장
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // 드롭 가능하도록 설정
  };

  const handleDrop = (event) => {
    event.preventDefault();

    if (!draggingEmoji || !mapRef.current) return;

    const mapBounds = mapContainerRef.current.getBoundingClientRect();
    const mapInstance = mapRef.current;

    // 드롭된 위치의 픽셀 좌표 계산
    const pixelPosition = {
      x: event.clientX - mapBounds.left,
      y: event.clientY - mapBounds.top,
    };

    // Google Maps API를 사용하여 픽셀 좌표를 위도/경도로 변환
    const overlayProjection = new window.google.maps.OverlayView();
    overlayProjection.onAdd = () => {}; // 비어 있는 onAdd 함수 필요
    overlayProjection.draw = () => {}; // 비어 있는 draw 함수 필요
    overlayProjection.setMap(mapInstance);

    const latLng = overlayProjection.getProjection().fromContainerPixelToLatLng(pixelPosition);

    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { position: { lat: latLng.lat(), lng: latLng.lng() }, emoji: draggingEmoji },
    ]);

    setDraggingEmoji(null); // 드래그 상태 초기화
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Container>
      <div
        ref={mapContainerRef}
        style={{ position: "relative", width: "100%", height: "100%" }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={18}
          onLoad={(map) => (mapRef.current = map)} // Google Maps 객체 저장
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              icon={{
                url: createEmojiCursor(marker.emoji),
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          ))}
        </GoogleMap>
      </div>

      <EmojiSelector>
        {emojis.map((emoji, index) => (
          <EmojiButton key={index} draggable onDragStart={handleDragStart(emoji)}>
            {emoji}
          </EmojiButton>
        ))}
      </EmojiSelector>
    </Container>
  );
}

// 이모지를 커서로 변환
function createEmojiCursor(emoji) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 64;
  canvas.height = 64;

  ctx.font = "48px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, 32, 32);

  return canvas.toDataURL();
}
