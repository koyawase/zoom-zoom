import { Marker } from "react-map-gl";

const CustomMarker = ({ iconUrl, position }) => {
  return (
    <Marker
      latitude={Number(position.latitude)}
      longitude={Number(position.longitude)}
    >
      <img height="50" src={iconUrl} alt="vehicle map marker" />
    </Marker>
  );
};

export default CustomMarker;
