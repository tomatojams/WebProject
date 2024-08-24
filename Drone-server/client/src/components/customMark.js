import React, { useState } from "react";

export default function CustomMark({ setCustomMarkers }) {
  const [coordinates, setCoordinates] = useState({ lat: "", lon: "" });
  const [selectedMark, setSelectedMark] = useState("mark1");

  const handleCoordinateChange = (e) => {
    const { name, value } = e.target;
    setCoordinates((prev) => ({ ...prev, [name]: value }));
  };

  const handleMarkChange = (e) => {
    setSelectedMark(e.target.value);
  };

  const handleAddMarker = () => {
    if (coordinates.lat && coordinates.lon) {
      setCustomMarkers((prev) => [
        ...prev,
        {
          lat: parseFloat(coordinates.lat),
          lon: parseFloat(coordinates.lon),
          markType: selectedMark,
        },
      ]);
      setCoordinates({ lat: "", lon: "" });
    }
  };
  return (
    <>
      <div style={{ padding: "10px", borderBottom: "1px solid #ddd", background: "#f8f8f8" }}>
        <h2>커스텀 마크 추가</h2>
        <input
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
        <select value={selectedMark} onChange={handleMarkChange} style={{ width: "90%", marginBottom: "10px" }}>
          <option value="mark1">Mark 1</option>
          <option value="mark2">Mark 2</option>
          <option value="mark3">Mark 3</option>
          <option value="mark4">Mark 4</option>
        </select>
        <button onClick={handleAddMarker} style={{ width: "90%" }}>
          마크 추가
        </button>
      </div>
    </>
  );
}
