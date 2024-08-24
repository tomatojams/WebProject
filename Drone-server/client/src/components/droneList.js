import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { selectedDroneState } from "../atom";

export default function DroneList({ latestPositions, handleDroneSelect, handleFilterDrone, filteredDrons }) {
  // 선택된 드론 ID를 저장해서 백그라운드 색상을 변경**
  const [selectedDroneId, setSelectedDroneId] = useRecoilState(selectedDroneState);
  const [searchTerm, setSearchTerm] = useState("");
  const handleItemClick = (droneId) => {
    // 클릭된 드론 ID가 현재 선택된 드론과 같으면 선택 해제, 아니면 선택
    setSelectedDroneId((prevId) => (prevId === droneId ? null : droneId));
    handleDroneSelect(droneId); // 드론을 선택할 때 호출
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDronsList = latestPositions.filter((drone) =>
    drone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        height: "500px", // 고정된 높이
        overflowY: "auto", // 내용이 넘칠 경우 스크롤
        borderBottom: "1px solid #ddd",
        padding: "10px",
        background: "#f8f8f8",
        display: "flex",
        flexDirection: "column",
      }}>
      <h2>드론 목록</h2>
      <input
        type="text"
        placeholder="드론 이름 검색..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ width: "90%", marginBottom: "10px", padding: "8px" }}
      />
      {filteredDronsList.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {filteredDronsList.map((drone) => (
            <li
              key={drone.droneId}
              onClick={() => handleItemClick(drone.droneId)}
              style={{
                padding: "8px",
                borderBottom: "1px solid #ddd",
                cursor: "pointer",
                backgroundColor: selectedDroneId === drone.droneId ? "pink" : "white",
                fontWeight:
                  searchTerm && drone.name.toLowerCase().includes(searchTerm.toLowerCase()) ? "bold" : "normal",
                transition: "background-color 0.3s ease", // 배경색 변화 부드럽게
              }}>
              {drone.name}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 클릭 이벤트가 상위 항목으로 전파되는 것을 막음
                  handleFilterDrone(drone.droneId);
                }}
                style={{
                  marginLeft: "10px",
                  backgroundColor: filteredDrons.includes(drone.droneId) ? "lightcoral" : "#e0e0e0",
                  border: "none",
                  cursor: "pointer",
                }}>
                {filteredDrons.includes(drone.droneId) ? "활성화" : "필터"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>등록된 드론이 없습니다.</p>
      )}
    </div>
  );
}
