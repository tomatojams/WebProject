import { useState, useRef } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import styled from "styled-components";
import Draggable from "react-draggable";

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
    googleMapsApiKey: VITE_GOOGLE_MAPS_API_KEY, // .env 파일에서 불러온 키
  });

  const mapRef = useRef(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [markers, setMarkers] = useState([]);

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  const handleDrop = (event) => {
    if (selectedEmoji && mapRef.current) {
      const mapBounds = mapRef.current.getBounds();
      const topRight = mapBounds.getNorthEast(); // 우상단 좌표
      const bottomLeft = mapBounds.getSouthWest(); // 좌하단 좌표

      const mapWidth = mapRef.current.getDiv().offsetWidth;
      const mapHeight = mapRef.current.getDiv().offsetHeight;

      const x = event.clientX - mapRef.current.getDiv().getBoundingClientRect().left;
      const y = event.clientY - mapRef.current.getDiv().getBoundingClientRect().top;

      const lat = bottomLeft.lat() + (1 - y / mapHeight) * (topRight.lat() - bottomLeft.lat());
      const lng = bottomLeft.lng() + (x / mapWidth) * (topRight.lng() - bottomLeft.lng());

      setMarkers((current) => [
        ...current,
        {
          lat,
          lng,
          emoji: selectedEmoji,
        },
      ]);

      setSelectedEmoji(null);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Container onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={18} onLoad={onMapLoad}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
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
          <Draggable key={index}>
            <EmojiButton onMouseDown={() => setSelectedEmoji(emoji)}>{emoji}</EmojiButton>
          </Draggable>
        ))}
      </EmojiSelector>
    </Container>
  );
}
