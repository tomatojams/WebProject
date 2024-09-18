import React from "react";
import styled from "styled-components";
const Card = styled.div`
  width: 350px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.1);
  position: relative;
`;

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

export default function InfoDrone({ selectedDroneData }) {
  return (
    <Card>
      <Title> DRONE INFO</Title>
      {selectedDroneData ? (
        <div className="info-drone-content">
          <div className="info-drone-section">
            <p>
              <strong className="info-drone-strong">Drone ID:</strong>
              <br />
              <span className="info-drone-value-highlight">{selectedDroneData.drone.droneId}</span>
            </p>
            <p>
              <strong className="info-drone-strong">Message:</strong>
              <br />
              <span className="info-drone-value">{selectedDroneData.message}</span>
            </p>
            <p>
              <strong className="info-drone-strong">Name:</strong>
              <br />
              <span className="info-drone-value">{selectedDroneData.drone.name}</span>
            </p>
            <p>
              <strong className="info-drone-strong">Frequency:</strong>
              <br />
              <span className="info-drone-value">{selectedDroneData.drone.frequency}</span>
            </p>
            <p>
              <strong className="info-drone-strong">Bandwidth:</strong>
              <br />
              <span className="info-drone-value">{selectedDroneData.drone.bandwidth}</span>
            </p>
            <p>
              <strong className="info-drone-strong">Allow Track:</strong>
              <br />
              <span
                className={
                  selectedDroneData.drone.allow_track
                    ? "info-drone-status-yes"
                    : "info-drone-status-no"
                }>
                {selectedDroneData.drone.allow_track ? "Yes" : "No"}
              </span>
            </p>
          </div>
          <div className="info-drone-section">
            <p>
              <strong className="info-drone-strong">Allow Takeover:</strong>
              <br />
              <span
                className={
                  selectedDroneData.drone.allow_takeover
                    ? "info-drone-status-yes"
                    : "info-drone-status-no"
                }>
                {selectedDroneData.drone.allow_takeover ? "Yes" : "No"}
              </span>
            </p>
            <p>
              <strong className="info-drone-strong">Class Name:</strong>
              <br />
              <span className="info-drone-value">{selectedDroneData.drone.class_name}</span>
            </p>
            <p>
              <strong className="info-drone-strong">Radio Resources:</strong>
              <br />
              <span className="info-drone-value">{selectedDroneData.drone.radio_resources}</span>
            </p>
            <p>
              <strong className="info-drone-strong">Latitude:</strong>
              <br />
              <span className="info-drone-value">{selectedDroneData.drone.latitude}</span>
            </p>
            <p>
              <strong className="info-drone-strong">Longitude:</strong>
              <br />
              <span className="info-drone-value">{selectedDroneData.drone.longitude}</span>
            </p>
          </div>
        </div>
      ) : (
        <p className="info-drone-placeholder">드론을 선택해 주세요.</p>
      )}
    </Card>
  );
}
