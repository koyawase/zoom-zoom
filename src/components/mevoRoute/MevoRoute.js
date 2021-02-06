import { useState, useEffect } from "react";
import { Source, Layer } from "react-map-gl";
import { distance } from "@turf/turf";

const MevoRoute = ({ vehicleData, userLocation }) => {
  const [route, setRoute] = useState({});

  // using distance package to get shortest distance between current location and all vehicles
  // use mapbox directions api to generate geojson coordinates of path between current location and nearest vehicle
  // set route state and use that for rendering path  
  function getNearestMevo() {
    var shortestDistance = Number.MAX_SAFE_INTEGER;
    var nearestMevo = {};
    vehicleData.map(data => {
      const from = [userLocation.lat, userLocation.long];
      const to = [data.position.latitude, data.position.longitude];
      const dist = distance(from, to);

      if (dist < shortestDistance) {
        nearestMevo = {
          long: data.position.longitude,
          lat: data.position.latitude
        };
        shortestDistance = dist;
      }
    });
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.long},${userLocation.lat};${nearestMevo.long},${nearestMevo.lat}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKENS}`
    )
      .then(response => response.json())
      .then(data => setRoute(data.routes[0].geometry));
  }

  useEffect(() => {
    getNearestMevo();
  }, []);

  return (
    <div className="mevo-route">
      {Object.keys(route).length === 0 ? null : (
        <Source id="route" type="geojson" data={route}>
          <Layer
            id="route-layer"
            type="line"
            source="route"
            paint={{ "line-color": "#00afdd", "line-width": 3 }}
          />
        </Source>
      )}
    </div>
  );
};

export default MevoRoute;
