import { useState, useRef, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript, OverlayViewF } from "@react-google-maps/api";

import {
  Container,
  EmojiSelector,
  Message,
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
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [mapOptions, setMapOptions] = useState({
    draggable: true,
    disableDefaultUI: true,
  });
  const [isPhotoSelectionVisible, setIsPhotoSelectionVisible] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (activeMarkerIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeMarkerIndex]);

  const handleMapClick = (event) => {
    if (selectedEmoji) {
      const newMarker = {
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        },
        emoji: selectedEmoji,
        text: "",
        photo: null,
      };
      setMarkers((current) => [...current, newMarker]);
      setSelectedEmoji(null);
      setActiveMarkerIndex(markers.length);
      setShowMessage(false);
      setMapOptions((prev) => ({
        ...prev,
        draggable: true,
        draggableCursor: "grab",
      }));
      document.body.style.cursor = "default";
    }
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    setShowMessage(true);
    setMapOptions((prev) => ({
      ...prev,
      draggable: false,
      draggableCursor: `url(${createEmojiCursor(emoji)}) 32 32, auto`,
    }));
    document.body.style.cursor = `url(${createEmojiCursor(emoji)}) 32 32, auto`;
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
    setActiveMarkerIndex(null);
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
        options={mapOptions}
        onClick={handleMapClick}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={{
              url: createEmojiCursor(marker.emoji),
              scaledSize: new window.google.maps.Size(60, 60),
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
              {marker.text || "여기에 입력된 텍스트가 표시됩니다."}
            </Balloon>
          </OverlayViewF>
        ))}
      </GoogleMap>

      {showMessage && <Message>이모지를 원하는 위치에 꽂아주세요.</Message>}

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

      {activeMarkerIndex === null && !isPhotoSelectionVisible && (
        <EmojiSelector>
          {emojis.map((emoji, index) => (
            <EmojiButton key={index} onClick={() => handleEmojiClick(emoji)}>
              {emoji}
            </EmojiButton>
          ))}
        </EmojiSelector>
      )}

      {activeMarkerIndex !== null && !isPhotoSelectionVisible && (
        <InputContainer>
          <InputField
            ref={inputRef}
            value={markers[activeMarkerIndex]?.text || ""}
            onChange={(e) => {
              const updatedMarkers = markers.map((marker, index) =>
                index === activeMarkerIndex ? { ...marker, text: e.target.value } : marker
              );
              setMarkers(updatedMarkers);
            }}
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
    </Container>
  );
}
