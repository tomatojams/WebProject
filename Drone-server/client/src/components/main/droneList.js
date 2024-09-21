import React from "react";
import { useRecoilState } from "recoil";
import { selectedDroneState } from "../../atom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Card = styled.div`
  margin-left: 12px;
  margin-top: 8px;
  margin-right: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-bottom: 20px;
`;

// const Row = styled.div`
//   display: flex;
//   align-items: end;
// `;
const Title = styled.h2`
  width: 100%;
  background-color: #f1f5f9;
  padding: 10px 30px;
  margin: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  font-weight: bold;
  font-family: "Satoshi", sans-serif;
  letter-spacing: 0.36em; /* 자간 36% */
  color: #0e43b9;
`;

const SearchInput = styled.input`
  margin: 10px 0px;

  &:focus {
    outline: none;
  }
`;

const Dronelist = styled.ul`
  width: 100%;
  padding: 0px 20px;
`;

const DroneElement = styled.li`
  width: 100%;
  height: 34px;
  padding: 0px 20px;
  margin: 5px 0px;
`;

const FilterOff = styled(motion.span)`
  display: flex;
  align-items: center;
  padding: 0px 2px;
  width: 50px;
  border-radius: 17px;
  background-color: #e7e7e7;
  height: 28px;
`;
const FilterOn = styled(motion.span)`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0px 2px;
  width: 50px;
  border-radius: 17px;
  background-color: #7d87f8;
  height: 28px;
`;

const FilterSwitch = styled(motion.span)`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.1);
`;

export default function DroneList({ latestPositions, handleFilterDrone, filteredDrons }) {
  // useForm
  const { register, watch } = useForm();

  // 선택된 드론 ID를 저장해서 백그라운드 색상을 변경**
  const [selectedDroneId, setSelectedDroneId] = useRecoilState(selectedDroneState);

  const handleItemClick = (droneId) => {
    // 클릭된 드론 ID가 현재 선택된 드론과 같으면 선택 해제, 아니면 선택
    setSelectedDroneId((prevId) => (prevId === droneId ? null : droneId));
    // handleDroneSelect(droneId); // 드론을 선택할 때 호출
  };
  const searchTerm = watch("search") || ""; // useState("") 처음 빈문자열 초기화

  const filteredDronsList = latestPositions.filter((drone) =>
    // toLowerCase()를 쓰려면 undefined가 아니어야 하므로 ? 또는 ""로 초기화
    drone.name.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <Card>
      <Title>DRONE LIST</Title>
      <SearchInput
        {...register("search")}
        type="text"
        placeholder="드론 이름 검색..."
        value={searchTerm}
        className="drone-list-search"
      />
      {filteredDronsList.length > 0 ? (
        <Dronelist>
          {filteredDronsList.map((drone) => (
            <DroneElement
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
                }}>
                {filteredDrons.includes(drone.droneId) ? (
                  <FilterOn layoutId={`${drone.droneId + "back"}`}>
                    <FilterSwitch layoutId={`${drone.droneId}`} />
                  </FilterOn>
                ) : (
                  <FilterOff layoutId={`${drone.droneId + "back"}`}>
                    <FilterSwitch layoutId={`${drone.droneId}`} />
                  </FilterOff>
                )}
              </button>
            </DroneElement>
          ))}
        </Dronelist>
      ) : (
        <p className="drone-list-placeholder">등록된 드론이 없습니다.</p>
      )}
    </Card>
  );
}
