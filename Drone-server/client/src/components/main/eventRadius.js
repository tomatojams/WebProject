// EventRadius.js
import React from "react";
import styled from "styled-components";

// 스타일 컴포넌트 정의
const Card = styled.div`
  margin: 11px;
  width: 350px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Row = styled.div`
  display: flex;
  align-items: end;
`;
const Title = styled.h2`
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

const InfoText = styled.div`
  padding: 4px 30px 10px;
  font-family: "Satoshi", sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #555;
  display: flex;
  align-items: end;
`;

const RadiusInput = styled.input`
  width: 60px;
  margin-top: 10px;
  height: 25px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  /* border: 1px solid #ccc; */
  border-radius: 4px;
  text-align: right;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

export default function EventRadius({ setCustomMarkers, droneCount, radius, setRadius }) {
  return (
    <Card>
      <Title>EVENT RADIUS</Title>
      <Row>
        <InfoText>
          <strong>Radius:</strong>{" "}
          <RadiusInput
            type="number"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value, 10))}
            placeholder="Set radius"
          />
          m
        </InfoText>

        <InfoText>
          <strong>In event:</strong> {droneCount}
        </InfoText>
      </Row>
    </Card>
  );
}
