import Branch from "../models/branch.model";
import { createMap } from "../services/map";

type mapComponentProps = {
  branches: Branch[];
};

function MapComponent(props: mapComponentProps) {
  const { initialMap, initialStoreLayer } = createMap(props.branches);
    initialStoreLayer;
  initialMap.on("click", (event) => {
    // console.log(event.target);
    
    const clickedFeature = initialMap.forEachFeatureAtPixel(
      event.pixel,
      (feature) => feature
    );
    // console.log("Feature clicked:", clickedFeature);
    if (clickedFeature) {
      const clickedBranch = clickedFeature.get("branch");
      console.log("Branch clicked:", clickedBranch);
    }
  });

  return (
    <div>
      <div id="map" className="map"></div>
    </div>
  );
}

export default MapComponent;
