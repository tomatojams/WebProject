import { useState, useRef, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript, OverlayViewF } from "@react-google-maps/api";
import {
  Container,
  EmojiSelector,
  InputContainer,
  PhotoSelectionContainer,
  EmojiButton,
  InputField,
  PhotoUploadButton,
  CancelButton,
  PhotoPreview,
  SubmitButton,
  Balloon,
} from "./component/styled.js";

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
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);
  const [isPhotoSelectionVisible, setIsPhotoSelectionVisible] = useState(false);

  const mapContainerRef = useRef(null); // Google Map 컨테이너
  const mapRef = useRef(null); // Google Map 객체
  const overlayRef = useRef(null); // OverlayView 객체
  const inputRef = useRef(null); // 텍스트 입력창 참조

  useEffect(() => {
    if (mapRef.current) {
      // Google Maps와 동기화된 OverlayView 생성
      const overlay = new window.google.maps.OverlayView();
      overlay.onAdd = () => {};
      overlay.draw = () => {};
      overlay.setMap(mapRef.current);
      overlayRef.current = overlay;
    }
  }, [mapRef.current]);

  useEffect(() => {
    if (activeMarkerIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeMarkerIndex]);

  const handleDragStart = (emoji) => () => {
    setDraggingEmoji(emoji); // 드래그 시작 시 선택된 이모지 저장
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // 드롭 가능하도록 설정
  };

  const handleDrop = (event) => {
    event.preventDefault();

    if (!draggingEmoji || !overlayRef.current) return;

    const mapBounds = mapContainerRef.current.getBoundingClientRect();
    const pixelPosition = {
      x: event.clientX - mapBounds.left,
      y: event.clientY - mapBounds.top,
    };

    const latLng = overlayRef.current.getProjection().fromContainerPixelToLatLng(pixelPosition);

    const newMarker = {
      position: { lat: latLng.lat(), lng: latLng.lng() },
      emoji: draggingEmoji,
      text: "",
      photo: null,
    };

    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    setActiveMarkerIndex(markers.length); // 새로 추가된 마커를 활성 상태로 설정
    setDraggingEmoji(null); // 드래그 상태 초기화
  };

  const handleTextChange = (event) => {
    const updatedMarkers = markers.map((marker, index) =>
      index === activeMarkerIndex ? { ...marker, text: event.target.value } : marker
    );
    setMarkers(updatedMarkers);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedMarkers = markers.map((marker, index) =>
          index === activeMarkerIndex ? { ...marker, photo: reader.result } : marker
        );
        setMarkers(updatedMarkers);
      };
      reader.readAsDataURL(file);
    }
    setIsPhotoSelectionVisible(false);
  };

  const handleSubmit = () => {
    setActiveMarkerIndex(null); // 텍스트 입력 완료 시 비활성화
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
              onClick={() => setActiveMarkerIndex(index)}
            />
          ))}

          {markers.map((marker, index) => (
            <OverlayViewF
              key={`overlay-${index}`}
              position={marker.position}
              mapPaneName="overlayMouseTarget">
              <Balloon>
                {marker.photo && <PhotoPreview src={marker.photo} />}
                {marker.text || "텍스트를 입력해주세요."}
              </Balloon>
            </OverlayViewF>
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

      {activeMarkerIndex !== null && (
        <InputContainer>
          <InputField
            ref={inputRef}
            value={markers[activeMarkerIndex]?.text || ""}
            onChange={handleTextChange}
            placeholder="내용을 입력하세요..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <PhotoUploadButton onClick={() => setIsPhotoSelectionVisible(true)}>
              사진 선택
            </PhotoUploadButton>
            <SubmitButton onClick={handleSubmit}>완료</SubmitButton>
          </div>
        </InputContainer>
      )}

      {isPhotoSelectionVisible && (
        <PhotoSelectionContainer>
          <label htmlFor="photo-upload">
            <PhotoUploadButton>사진 선택</PhotoUploadButton>
          </label>
          <CancelButton onClick={() => setIsPhotoSelectionVisible(false)}>취소</CancelButton>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoUpload}
          />
        </PhotoSelectionContainer>
      )}
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
