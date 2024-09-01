import React from "react";
import { useRecoilState } from "recoil";
import { selectedDroneState } from "../atom";
import { useForm } from "react-hook-form";

export default function DroneList({
  latestPositions,
  handleDroneSelect,
  handleFilterDrone,
  filteredDrons,
}) {
  // useForm
  const { register, watch } = useForm();

  // 선택된 드론 ID를 저장해서 백그라운드 색상을 변경**
  const [selectedDroneId, setSelectedDroneId] = useRecoilState(selectedDroneState);

  const handleItemClick = (droneId) => {
    // 클릭된 드론 ID가 현재 선택된 드론과 같으면 선택 해제, 아니면 선택
    setSelectedDroneId((prevId) => (prevId === droneId ? null : droneId));
    handleDroneSelect(droneId); // 드론을 선택할 때 호출
  };
  const searchTerm = watch("search") || ""; // useState("") 처음 빈문자열 초기화

  const filteredDronsList = latestPositions.filter((drone) =>
    // toLowerCase()를 쓰려면 undefined가 아니어야 하므로 ? 또는 ""로 초기화
    drone.name.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="drone-list-container mr-4">
      <h2 className="drone-list-title">드론 목록</h2>
      <input
        {...register("search")}
        type="text"
        placeholder="드론 이름 검색..."
        value={searchTerm}
        className="drone-list-search"
      />
      {filteredDronsList.length > 0 ? (
        <ul className="drone-list">
          {filteredDronsList.map((drone) => (
            <li
              key={drone.droneId}
              onClick={() => handleItemClick(drone.droneId)}
              className={`drone-list-item ${selectedDroneId === drone.droneId ? "selected" : ""}`}>
              <span
                className={`drone-list-item-name ${searchTerm && drone.name.toLowerCase().includes(searchTerm.toLowerCase()) ? "bold" : ""}`}>
                {drone.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 클릭 이벤트가 상위 항목으로 전파되는 것을 막음
                  handleFilterDrone(drone.droneId);
                }}
                className={`drone-list-item-button ${filteredDrons.includes(drone.droneId) ? "filtered" : ""}`}>
                {filteredDrons.includes(drone.droneId) ? "활성화" : "필터"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="drone-list-placeholder">등록된 드론이 없습니다.</p>
      )}
    </div>
  );
}
