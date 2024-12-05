import { useState } from "react";
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
  height: 200px;
  box-sizing: border-box;
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

const Message = styled.div`
  position: absolute;
  height: 200px;
  box-sizing: border-box;
  z-index: 99;
  width: 98%;
  bottom: 0px;
  text-align: center;
  font-size: 18px;
  color: #333;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.9);
  padding: 80px;
`;

const InputContainer = styled.div`
  position: absolute;
  width: 98%;
  height: 200px;
  box-sizing: border-box;
  bottom: 0px;
  background: rgba(255, 255, 255, 0.9);
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
`;

const EmojiButton = styled.div`
  font-size: 45px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const InputField = styled.textarea`
  width: 90%;
  height: 60px;
  font-size: 16px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
  resize: none;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: #45a049;
  }
`;

export default function App() {
  const { VITE_GOOGLE_MAPS_API_KEY } = import.meta.env;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: VITE_GOOGLE_MAPS_API_KEY,
  });

  const [markers, setMarkers] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showMessage, setShowMessage] = useState(false); // 메시지 표시 상태
  const [mapOptions, setMapOptions] = useState({
    draggable: true,
    disableDefaultUI: true, // 기본 UI 비활성화
  });

  const handleMapClick = (event) => {
    if (selectedEmoji) {
      const newMarker = {
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        },
        emoji: selectedEmoji,
        text: "", // 말풍선 텍스트 초기값
      };
      setMarkers((current) => [...current, newMarker]);
      setSelectedEmoji(null);
      setActiveMarkerIndex(markers.length); // 새로 추가된 마커 활성화
      setShowMessage(false); // 메시지 숨기기
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
    setShowMessage(true); // 메시지 표시
    setMapOptions((prev) => ({
      ...prev,
      draggable: false,
      draggableCursor: `url(${createEmojiCursor(emoji)}) 32 32, auto`, // Google Maps 커서 변경
    }));
    document.body.style.cursor = `url(${createEmojiCursor(emoji)}) 32 32, auto`; // 브라우저 커서 변경
  };

  const handleSubmit = () => {
    const updatedMarkers = markers.map((marker, index) =>
      index === activeMarkerIndex ? { ...marker, text: inputValue } : marker
    );
    setMarkers(updatedMarkers);
    setInputValue(""); // 입력 필드 초기화
    setActiveMarkerIndex(null); // 활성화된 마커 해제
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
          <Marker
            key={index}
            position={marker.position}
            icon={{
              url: createEmojiCursor(marker.emoji),
              scaledSize: new window.google.maps.Size(32, 32), // 마커 크기 설정
            }}
            onClick={() => setActiveMarkerIndex(index)} // 마커 클릭 시 활성화
          >
            {activeMarkerIndex === index && marker.text && (
              <div
                style={{
                  position: "absolute",
                  transform: "translate(-50%, -100%)",
                  background: "white",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "5px",
                  maxWidth: "150px",
                  textAlign: "center",
                }}>
                {marker.text}
              </div>
            )}
          </Marker>
        ))}
      </GoogleMap>

      {showMessage && <Message>이모지를 원하는 위치에 꽂아주세요.</Message>}

      {activeMarkerIndex === null && (
        <EmojiSelector>
          {emojis.map((emoji, index) => (
            <EmojiButton key={index} onClick={() => handleEmojiClick(emoji)}>
              {emoji}
            </EmojiButton>
          ))}
        </EmojiSelector>
      )}

      {activeMarkerIndex !== null && (
        <InputContainer>
          <InputField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="내용을 입력하세요..."
          />
          <SubmitButton onClick={handleSubmit}>완료</SubmitButton>
        </InputContainer>
      )}
    </Container>
  );
}
