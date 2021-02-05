import { Source, Layer } from "react-map-gl";

const HomeZoneLayer = ({ data }) => {
  return (
    <Source id="home-zones" type="geojson" data={data}>
      <Layer
        id="home-zones-layer"
        type="line"
        source="home-zones"
        paint={{ "line-color": "#f7590d", "line-width": 3 }}
      />
    </Source>
  );
};

export default HomeZoneLayer;
