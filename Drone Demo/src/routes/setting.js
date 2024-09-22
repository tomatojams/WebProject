import AppHeader from "../components/nav";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { selectedDroneState } from "../atom";
import { useQuery } from "react-query";
import { fetchDroneList, fetchSensorList, deleteDroneList } from "../components/api";
import SensorCard from "../components/setting/sensor";
import PopupComponent from "../components/setting/popup";

import {
  MainContainer,
  ContentWrapper,
  SensorCardList,
  SensorCardWrapper,
  DroneCardList,
  DroneCardListWrapper,
  Title,
  SearchInput,
  Dronelist,
  AlignRight,
  SimpleButton,
  DroneElement,
} from "../components/setting/settingStyled";

export default function Setting() {
  const { data: droneList = [], refetch } = useQuery("droneList", fetchDroneList, {
    refetchInterval: 10000,
  });

  const { data: SensorList = [] } = useQuery("sensorList", fetchSensorList, {
    refetchInterval: 10000,
  });

  const { register, watch } = useForm();
  const [selectedDroneId, setSelectedDroneId] = useRecoilState(selectedDroneState);
  const [popupDrone, setPopupDrone] = useState(null);

  const searchTerm = watch("search") || "";

  const filteredDronsList = droneList.filter((drone) =>
    drone.name.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const handleDelete = async () => {
    try {
      await deleteDroneList();
      refetch();
    } catch (error) {
      console.error("Error deleting drones:", error);
    }
  };

  const handleItemClick = (droneId) => {
    setSelectedDroneId((prevId) => (prevId === droneId ? null : droneId));
    const selectedDrone = droneList.find((drone) => drone.droneId === droneId);
    setPopupDrone(selectedDrone);
  };
  console.log(SensorList);
  return (
    <MainContainer>
      <AppHeader />
      <ContentWrapper>
        <SensorCardWrapper>
          <Title>SENSOR SETTING</Title>{" "}
          <SensorCardList>
            {SensorList
              ? SensorList.map((item, index) => (
                  <>
                    <SensorCard sensor={SensorList[index]} />
                  </>
                ))
              : null}
          </SensorCardList>
        </SensorCardWrapper>
        <DroneCardListWrapper>
          <DroneCardList>
            <Title>DRONE LIST</Title>
            <AlignRight>
              <SimpleButton onClick={handleDelete}>Demo</SimpleButton>
            </AlignRight>

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
                      className={`drone-list-item-name ${
                        searchTerm && drone.name.toLowerCase().includes(searchTerm.toLowerCase())
                          ? "bold"
                          : ""
                      }`}>
                      {drone.name}
                    </span>
                  </DroneElement>
                ))}
              </Dronelist>
            ) : (
              <p className="drone-list-placeholder">등록된 드론이 없습니다.</p>
            )}
          </DroneCardList>
        </DroneCardListWrapper>
      </ContentWrapper>

      {/* Popup 컴포넌트 사용 */}
      <PopupComponent popupDrone={popupDrone} onClose={() => setPopupDrone(null)} />
    </MainContainer>
  );
}
