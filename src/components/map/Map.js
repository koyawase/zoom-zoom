import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";

const Map = ({ lat, long, zoom }) => {
  const [viewport, setViewport] = useState({
    height: "100vh",
    width: "100wh",
    latitude: lat,
    longitude: long,
    zoom: zoom
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle='mapbox://styles/mapbox/basic-v9'
    />
  );
};

Map.defaultProps = {
  lat: -41.2924,
  long: 174.778,
  zoom: 15
};

export default Map;
