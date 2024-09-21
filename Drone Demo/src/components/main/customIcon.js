import L from "leaflet";
const droneIconUrl = `${process.env.PUBLIC_URL}/drone_2.png`;
const droneIconRedUrl = `${process.env.PUBLIC_URL}/drone_2_red.png`;
const droneEventIconUrl = `${process.env.PUBLIC_URL}/drone_event.png`;

export const getCustomMarkerIcon = (markType) => {
  const icons = {
    mark1: `${process.env.PUBLIC_URL}/mark1.png`,
    mark2: `${process.env.PUBLIC_URL}/mark2.png`,
    mark3: `${process.env.PUBLIC_URL}/mark3.png`,
    mark4: `${process.env.PUBLIC_URL}/mark4.png`,
  };
  return L.divIcon({
    className: "custom-marker-icon",
    html: `
        <div style="text-align: center;">
          <img src="${icons[markType]}" style="width: 30px; height: 30px;" alt="Marker" />
          <div style="
            font-size: 12px; 
            color: black; 
            margin-top: 5px; 
            background-color: rgba(255, 255, 255, 0.8); 
            padding: 2px 5px; 
            border-radius: 4px;
            display: inline-block;  
             transform: translateX(-8px);
          ">
            Sensor
          </div>
        </div>
      `,
    iconSize: [30, 42],
    iconAnchor: [15, 29],
  });
};

export const customCombinedIcon = (name, isSelected, isInEventRange) =>
  L.divIcon({
    className: "custom-marker-icon",
    html: `
        <div class="base-icon">
          <img src="${
            isSelected ? droneIconRedUrl : isInEventRange ? droneEventIconUrl : droneIconUrl
          }" alt="Drone" />
        </div>
        <div class="animated-icon" style="transform: translateX(-10px) translateY(50px);">
          <div class="custom-marker-label" style="width: 80px; text-align: center;">
            ${name}
          </div>
        </div>
      `,
    iconSize: [30, 30],
    iconAnchor: [20, 20],
  });
