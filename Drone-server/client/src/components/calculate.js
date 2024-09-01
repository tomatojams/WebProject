export const mapDistance = ([lat1, lon1], [lat2, lon2]) => {
  const R = 6371000; // 지구의 반지름 (미터)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// 반경값을 사용하여 드론이 센서 범위 안에 있는지 체크하고 카운트 업데이트

export const isDroneInEventRange = (dronePosition, markers, radius) => {
  const dronesInRange = markers.filter((marker) => {
    const distance = mapDistance(
      [dronePosition.latitude, dronePosition.longitude],
      [marker.lat, marker.lon]
    );
    return distance <= radius; // 반경 값 사용
  });

  return dronesInRange.length > 0;
};
