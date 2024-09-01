/* global naver */
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { selectedDroneState } from "../atom";

export default function MapBox({
  latestPositions,
  autoCenter,
  filteredDrons,
  customMarkers,
  handleDroneSelect,
}) {
  const mapRef = useRef(null);
  const [selectedDroneId, setSelectedDroneId] = useRecoilState(selectedDroneState);
  const [isNaverMapLoaded, setIsNaverMapLoaded] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const [mapZoom, setMapZoom] = useState(13);
  const mapInstance = useRef(null);

  useEffect(() => {
    // 네이버 지도 API 로드 확인
    const checkNaverMap = setInterval(() => {
      if (window.naver && window.naver.maps) {
        clearInterval(checkNaverMap);
        setIsNaverMapLoaded(true);
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (isNaverMapLoaded) {
      // 네이버 지도를 초기화합니다.
      const map = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(mapCenter.lat, mapCenter.lng),
        zoom: mapZoom,
        minZoom: 5,
        maxZoom: 25,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      });

      mapInstance.current = map;

      // 지도 줌 변경 시 상태 업데이트
      naver.maps.Event.addListener(map, "zoom_changed", () => {
        setMapZoom(map.getZoom());
      });

      // 지도 중심 변경 시 상태 업데이트
      naver.maps.Event.addListener(map, "center_changed", () => {
        const center = map.getCenter();
        setMapCenter({ lat: center.lat(), lng: center.lng() });
      });

      // 드론 위치에 마커를 추가합니다.
      latestPositions
        .filter((position) => !filteredDrons.includes(position.droneId))
        .forEach((position) => {
          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(position.latitude, position.longitude),
            map: map,
            icon: {
              url: `${process.env.PUBLIC_URL}/drone_1.png`,
              size: new naver.maps.Size(30, 30),
              origin: new naver.maps.Point(0, 0),
              anchor: new naver.maps.Point(15, 15),
            },
          });

          naver.maps.Event.addListener(marker, "click", () => {
            setSelectedDroneId((prevId) => (prevId === position.droneId ? null : position.droneId));
            handleDroneSelect(position.droneId);
          });

          const infoWindow = new naver.maps.InfoWindow({
            content: `<div style="padding: 5px; font-size: 12px;">${position.name}</div>`,
          });

          naver.maps.Event.addListener(marker, "click", () => {
            infoWindow.open(map, marker);
          });
        });

      customMarkers.forEach((marker) => {
        new naver.maps.Marker({
          position: new naver.maps.LatLng(marker.lat, marker.lon),
          map: map,
          icon: {
            url: `${process.env.PUBLIC_URL}/${marker.markType}.png`,
            size: new naver.maps.Size(30, 30),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(15, 15),
          },
        });
      });

      if (autoCenter && latestPositions.length > 0) {
        const bounds = new naver.maps.LatLngBounds();
        latestPositions
          .filter((position) => !filteredDrons.includes(position.droneId))
          .forEach((position) => {
            bounds.extend(new naver.maps.LatLng(position.latitude, position.longitude));
          });

        map.fitBounds(bounds, {
          maxZoom: 15,
        });
      }
    }
  }, [
    isNaverMapLoaded,
    latestPositions,
    autoCenter,
    filteredDrons,
    customMarkers,
    handleDroneSelect,
    setSelectedDroneId,
    mapCenter,
    mapZoom,
  ]);

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }} />;
}
