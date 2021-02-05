import { useState, useEffect } from "react";
import { LoadingSpinner, Map } from "./components";

function App() {
  const [vehicleData, setVehicleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    const res = await fetch("https://api.mevo.co.nz/public/vehicles/all");
    const data = await res.json();
    setVehicleData(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {isLoading ? <LoadingSpinner /> : <Map vehicleData={vehicleData}/>}
    </div>
  );
}

export default App;
