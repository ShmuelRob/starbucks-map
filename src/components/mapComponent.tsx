// import { useEffect } from "react";
// import Branch from "../models/branch.model";
import OlMap from "../services/olMap";
// import { createMap } from "../services/mapFunctions";

type mapComponentProps = {
  map: OlMap | null;
};

function MapComponent(props: mapComponentProps) {
  // useEffect(() => {
    if (props.map) {
      props.map.fetchStores().then(() => {
        // console.log("Stores fetched")
        });
    }
  // }, [props.map]);
  
  return (
    <div>
      <div id="map" className="map"></div>
    </div>
  );
}

export default MapComponent;



// for click event

// initialMap.on("click", (event) => {
//   // console.log(event.target);
  
//   const clickedFeature = initialMap.forEachFeatureAtPixel(
//     event.pixel,
//     (feature) => feature
//   );
//   // console.log("Feature clicked:", clickedFeature);
//   if (clickedFeature) {
//     const clickedBranch = clickedFeature.get("branch");
//     console.log("Branch clicked:", clickedBranch);
//   }
// });
