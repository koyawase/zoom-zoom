import { useState, useEffect } from "react";
import { LoadingSpinner, Map } from "./components";
import 'mapbox-gl/dist/mapbox-gl.css'

// This is to fix a known deployment issue with React. See here:
// https://github.com/mapbox/mapbox-gl-js/issues/10173
import mapboxgl from 'mapbox-gl';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

function App() {
  const [vehicleData, setVehicleData] = useState([]);
  const [homeZones, setHomeZones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Run fetch in parallel and set is loading to false once both APIs have returned successfully
  async function fetchData() {
    await Promise.all([
      fetch("https://api.mevo.co.nz/public/vehicles/all"),
      fetch("https://api.mevo.co.nz/public/home-zones/all")
    ])
      .then(responses => {
        responses[0].json().then(data => setVehicleData(data));
        responses[1].json().then(data => setHomeZones(data));
      })
      .catch(err => {
        throw err;
      });
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Map vehicleData={vehicleData} homeZones={homeZones} />
      )}
    </div>
  );
}

export default App;
