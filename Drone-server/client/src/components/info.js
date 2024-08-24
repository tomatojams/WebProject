export default function InfoDrone({ selectedDroneData, autoCenter, handleToggleAutoCenter }) {
  return (
    <>
      <div style={{ flex: 1, padding: "10px", background: "#f0f0f0", borderTop: "1px solid #ddd", marginTop: "auto" }}>
        <button onClick={handleToggleAutoCenter} style={{ marginBottom: "10px", width: "100%" }}>
          {autoCenter ? "자동 위치 추적 끄기" : "자동 위치 추적 켜기"}
        </button>
        {/* <button onClick={handleCenterLatestPosition} style={{ marginBottom: "20px", width: "100%" }}>
          최근 위치로 이동
        </button> */}
        {selectedDroneData ? (
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <p>
                <strong>Drone ID:</strong>
                <br /> {selectedDroneData.drone.droneId}
              </p>
              <p>
                <strong>Message:</strong> <br /> {selectedDroneData.message}
              </p>
              <p>
                <strong>Name:</strong>
                <br /> {selectedDroneData.drone.name}
              </p>
              <p>
                <strong>Frequency:</strong>
                <br /> {selectedDroneData.drone.frequency}
              </p>
              <p>
                <strong>Bandwidth:</strong> <br /> {selectedDroneData.drone.bandwidth}
              </p>
              <p>
                <strong>Allow Track:</strong> <br /> {selectedDroneData.drone.allow_track ? "Yes" : "No"}
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <p>
                <strong>Allow Takeover:</strong>
                <br /> {selectedDroneData.drone.allow_takeover ? "Yes" : "No"}
              </p>
              <p>
                <strong>Class Name:</strong> <br /> {selectedDroneData.drone.class_name}
              </p>
              <p>
                <strong>Radio Resources:</strong>
                <br /> {selectedDroneData.drone.radio_resources}
              </p>
              <p>
                <strong>Latitude:</strong>
                <br /> {selectedDroneData.drone.latitude}
              </p>
              <p>
                <strong>Longitude:</strong> <br /> {selectedDroneData.drone.longitude}
              </p>
            </div>
          </div>
        ) : (
          <p>드론을 선택해 주세요.</p>
        )}
      </div>
    </>
  );
}
