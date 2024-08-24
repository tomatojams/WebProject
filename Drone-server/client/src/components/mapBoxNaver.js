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

  useEffect(() => {
    // 네이버 지도 API 로드 확인
    const checkNaverMap = setInterval(() => {
      if (window.naver && window.naver.maps) {
        clearInterval(checkNaverMap);
        setIsNaverMapLoaded(true);
      }
    }, 100); // 100ms마다 네이버 지도 API 로드 여부 확인
  }, []);

  useEffect(() => {
    if (isNaverMapLoaded) {
      // 네이버 지도를 초기화합니다.
      const map = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(37.5665, 126.978),
        zoom: 13,
      });

      // 드론 위치에 마커를 추가합니다.
      latestPositions
      .filter((position) => !filteredDrons.includes(position.droneId))
      .forEach((position, index) => {
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

        // 마커 클릭 이벤트
        naver.maps.Event.addListener(marker, "click", () => {
          setSelectedDroneId((prevId) => (prevId === position.droneId ? null : position.droneId));
          handleDroneSelect(position.droneId);
        });

        // 드론 이름을 표시하는 방법 (클릭 시 정보창 띄우기)
        const infoWindow = new naver.maps.InfoWindow({
          content: `<div style="padding: 5px; font-size: 12px;">${position.name}</div>`,
        });

        naver.maps.Event.addListener(marker, "click", () => {
          infoWindow.open(map, marker);
        });
      });

      // 커스텀 마커를 지도에 추가합니다.
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

      // 자동 중앙 정렬 설정
      if (autoCenter && latestPositions.length > 0) {
        const bounds = new naver.maps.LatLngBounds();
        latestPositions
        .filter((position) => !filteredDrons.includes(position.droneId))
        .forEach((position) => {
          bounds.extend(new naver.maps.LatLng(position.latitude, position.longitude));
        });
        map.fitBounds(bounds);
      }
    }
  }, [isNaverMapLoaded, latestPositions, autoCenter, filteredDrons, customMarkers, handleDroneSelect, setSelectedDroneId]);

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }} />;
}

