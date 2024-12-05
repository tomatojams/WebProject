import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 37.5665,
  lng: 126.978, // 서울 시청
};

export default function MapComponent() {
  const GOOGLE_MAPS_API_KEY = import.meta.env.GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${GOOGLE_MAPS_API_KEY}`,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
      {/* 마커와 다른 컴포넌트 삽입 */}
    </GoogleMap>
  );
}
