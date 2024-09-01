// CustomMark.js

// import React, { useState } from "react";

export default function CustomMark({ setCustomMarkers, droneCount, radius, setRadius }) {
  // const [coordinates, setCoordinates] = useState({ lat: "", lon: "" });
  // const [selectedMark, setSelectedMark] = useState("mark1");

  // const handleCoordinateChange = (e) => {
  //   const { name, value } = e.target;
  //   setCoordinates((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleMarkChange = (e) => {
  //   setSelectedMark(e.target.value);
  // };

  // const handleAddMarker = () => {
  //   if (coordinates.lat && coordinates.lon) {
  //     const newMarker = {
  //       id: `custom-${Date.now()}`,
  //       lat: parseFloat(coordinates.lat),
  //       lon: parseFloat(coordinates.lon),
  //       markType: selectedMark,
  //       state: true,
  //     };

  //     setCustomMarkers((prev) => [...prev, newMarker]);
  //     setCoordinates({ lat: "", lon: "" });
  //   }
  // };

  return (
    <div className="mt-4 mr-4 mb-4 p-4 border-gray-300 bg-gray-100">
      <h2>이벤트 반경 조절</h2>
      {/* <input
        type="number"
        name="lat"
        placeholder="위도"
        value={coordinates.lat}
        onChange={handleCoordinateChange}
        style={{ width: "90%", marginBottom: "10px" }}
      />
      <input
        type="number"
        name="lon"
        placeholder="경도"
        value={coordinates.lon}
        onChange={handleCoordinateChange}
        style={{ width: "90%", marginBottom: "10px" }}
      />
      <select
        value={selectedMark}
        onChange={handleMarkChange}
        style={{ width: "90%", marginBottom: "10px" }}>
        <option value="mark1">Mark 1</option>
        <option value="mark2">Mark 2</option>
        <option value="mark3">Mark 3</option>
        <option value="mark4">Mark 4</option>
      </select>
      <button onClick={handleAddMarker} style={{ width: "90%" }}>
        마크 추가
      </button> */}
      <div style={{ marginTop: "10px" }}>
        <strong>Event:</strong> {droneCount}
      </div>
      {/* 반경 입력란 추가 */}
      <input
        type="number"
        value={radius}
        onChange={(e) => setRadius(parseInt(e.target.value, 10))}
        placeholder="반경 설정"
        style={{ width: "20%", marginTop: "10px", textAlign: "end" }}
      />{" "}
      m
    </div>
  );
}
