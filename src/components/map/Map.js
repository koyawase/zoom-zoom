import React, { useState } from "react";
import ReactMapGL, { GeolocateControl } from "react-map-gl";

import { CustomMarker, HomeZoneLayer, MevoRoute } from "../../components";

import "./Map.css";

const Map = ({ lat, long, zoom, vehicleData, homeZones }) => {
  const [viewport, setViewport] = useState({
    height: "100vh",
    width: "100wh",
    latitude: lat,
    longitude: long,
    zoom: zoom
  });

  const [userLocation, setUserLocation] = useState({});
  const [requestedRoute, setRequestedRoute] = useState(false);

  const geolocateControlStyle = {
    right: 10,
    top: 10
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKENS}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/mapbox/basic-v9"
    >
      {vehicleData.map((data, i) => {
        return <CustomMarker key={`custom-marker-${i}`} {...data} />;
      })}

      <HomeZoneLayer {...homeZones} />

      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        showAccuracyCircle={false}
        onGeolocate={geoLocation =>
          setUserLocation({
            lat: geoLocation.coords.latitude,
            long: geoLocation.coords.longitude
          })
        }
        auto
      />

      {requestedRoute ? (
        <MevoRoute userLocation={userLocation} vehicleData={vehicleData} />
      ) : null}

      {Object.keys(userLocation).length === 0 ? (
        <button
          className="map-btn-secondary map-btn-bottom"
          onClick={() =>
            alert(
              "Please enable and allow location tracking to use this feature"
            )
          }
        >
          Find Nearest Mevo
        </button>
      ) : (
        <button
          className="map-btn-primary map-btn-bottom"
          onClick={() => setRequestedRoute(!requestedRoute)}
        >
          {requestedRoute ? "Cancel Find" : "Find Nearest Mevo"}
        </button>
      )}
    </ReactMapGL>
  );
};

// Load map in Wellington Central Coordinates by default if user doesn't have location enabled
Map.defaultProps = {
  lat: -41.2924,
  long: 174.778,
  zoom: 15
};

export default Map;
