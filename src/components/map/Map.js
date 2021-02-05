import React, { useState } from "react";
import ReactMapGL, {GeolocateControl} from "react-map-gl";

import { CustomMarker, HomeZoneLayer } from "../../components";

const Map = ({ lat, long, zoom, vehicleData, homeZones }) => {
  const [viewport, setViewport] = useState({
    height: "100vh",
    width: "100wh",
    latitude: lat,
    longitude: long,
    zoom: zoom
  });

  const [userLocation, setUserLocation] = useState({});

  const geolocateControlStyle= {
    right: 10,
    top: 10
  };


  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/mapbox/basic-v9"
    >
      
      <h2>Latitude {userLocation.lat}</h2>
      <h2>Longitude {userLocation.long}</h2>

      {vehicleData.map((data, i) => {
        return <CustomMarker key={`custom-marker-${i}`} {...data} />;
      })}

      <HomeZoneLayer {...homeZones}/>

      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        showAccuracyCircle={false}
        onGeolocate={(geoLocation) => setUserLocation({"lat": geoLocation.coords.latitude, "long": geoLocation.coords.longitude})}
        auto
      />
    </ReactMapGL>
  );
};

Map.defaultProps = {
  lat: -41.2924,
  long: 174.778,
  zoom: 15
};

export default Map;
