// PopupComponent.js
import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const PopupOverlay = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const PopupFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding-top: 30px;
`;

const PopupField = styled.div`
  width: 100%;
  font-size: 16px;
  color: #555;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`;

const Title = styled.h2`
  position: absolute;
  width: 100%;
  top: 0;
  background-color: #f1f5f9;
  padding: 10px 30px;
  margin: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  font-weight: bold;
  font-family: "Satoshi", sans-serif;
  letter-spacing: 0.36em;
  color: #0e43b9;
`;
const SpanTitle = styled.span`
  font-weight: 500;
`;
const SpanTitleBlue = styled.span`
  font-weight: 500;
  color: #0e43b9;
`;
const DroneImage = styled.div`
  width: 150px;
  height: 150px;
  margin-top: 40px;
  background-image: url(${(props) => `${process.env.PUBLIC_URL}/drones/${props.droneName}.jpg`});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const SpanGreen = styled.span`
  color: #28a745;
`;
const PopupComponent = ({ popupDrone, onClose }) => {
  const popupRef = useRef();

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (popupDrone) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupDrone]);

  if (!popupDrone) return null;
  const droneImageName = popupDrone.name.replace(/\s+/g, "_").toLowerCase();
  return (
    <PopupOverlay>
      <PopupContainer ref={popupRef}>
        <PopupContent>
          <Title>{popupDrone.name}</Title>
          <DroneImage droneName={droneImageName} />
          <PopupFields>
            <PopupField>
              <SpanTitleBlue>Drone ID:</SpanTitleBlue>
              <SpanGreen>{popupDrone.droneId}</SpanGreen>
            </PopupField>
            <PopupField>
              <SpanTitle>Class:</SpanTitle>
              <span>{popupDrone.class_name}</span>
            </PopupField>
            <PopupField>
              <SpanTitle>Frequency:</SpanTitle>
              <span>{popupDrone.frequency}</span>
            </PopupField>
            <PopupField>
              <SpanTitle>Bandwidth:</SpanTitle>
              <span>{popupDrone.bandwidth}</span>
            </PopupField>
            <PopupField>
              <SpanTitle>Radio Resources:</SpanTitle>
              <span>{popupDrone.radio_resources}</span>
            </PopupField>
            <PopupField>
              <SpanTitle>Allow Takeover:</SpanTitle>
              <span>{popupDrone.allow_takeover ? "Yes" : "No"}</span>
            </PopupField>
            <PopupField>
              <SpanTitle>Allow Track:</SpanTitle>
              <span>{popupDrone.allow_track ? "Yes" : "No"}</span>
            </PopupField>
            <PopupField>
              <SpanTitle>Created At:</SpanTitle>
              <span>{new Date(popupDrone.createdAt).toLocaleString()}</span>
            </PopupField>
            <PopupField>
              <SpanTitle>Updated At:</SpanTitle>
              <span>{new Date(popupDrone.updatedAt).toLocaleString()}</span>
            </PopupField>
          </PopupFields>
        </PopupContent>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default PopupComponent;
