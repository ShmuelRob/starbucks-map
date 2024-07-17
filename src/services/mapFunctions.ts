// import Map from "ol/Map";
// import View from "ol/View";
// import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
// import { OSM } from "ol/source";
// import { Vector as VectorSource } from "ol/source";
// import { Geometry, Point } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";
// import Branch from "../models/branch.model";
// import { booleanPointInPolygon, point, polygon } from "@turf/turf";
// import getCountryCoords from "./getCountryCoords";
// import { alphaCode } from "./getCountryAlphaCode";


// function createMap(branches: Branch[]) {
//     const initialMap = new Map({
//         target: "map",
//         layers: [
//             new TileLayer({
//                 source: new OSM(),
//             }),
//         ],
//         view: new View({
//             center: fromLonLat([0, 0]),
//             zoom: 2,
//         }),
//     });

//     const initialStoreLayer = new VectorLayer({
//         source: new VectorSource(),
//     });
//     initialMap.addLayer(initialStoreLayer);
//     fetchStores(initialStoreLayer, branches);
//     return { initialMap, initialStoreLayer };
// }


// async function fetchStores(layer: VectorLayer<Feature<Geometry>>, branches: Branch[]) {
//     try {
//         const features = branches.map(
//             (branch: Branch) =>
//                 new Feature({
//                     geometry: new Point(fromLonLat([branch.longitude, branch.latitude])),
//                 })
//         );
//         layer.getSource()?.clear();
//         layer.getSource()?.addFeatures(features);
//     } catch (error) {
//         console.error("Error fetching stores:", error);
//     }
// }

// function addLocationsToMap(filteredLocations: Branch[], layer: VectorLayer<Feature<Geometry>>) {
//     const features = filteredLocations.map(
//         (location: Branch) =>
//             new Feature({
//                 geometry: new Point(fromLonLat([location.longitude, location.latitude])),
//                 branch: location,
//             })
//     );

//     layer.getSource()?.clear();
//     layer.getSource()?.addFeatures(features);

// }

// function showAllBranches() {

// }


// function showBranchesByCountry(countryAlpha2: alphaCode, branches: Branch[], layer: VectorLayer<Feature<Geometry>>) {
//     getBranchesByCountry(countryAlpha2, branches).then((filteredLocations) => {
//         addLocationsToMap(filteredLocations, layer);
//     });
// }

// async function getBranchesByCountry(countryAlpha2: alphaCode, branches: Branch[]) {
//     const countryPolygon = polygon((await getCountryCoords(countryAlpha2)).geometry.coords);
//     const filteredLocations = branches.filter(branch => {
//         const locationPoint = point([branch.longitude, branch.latitude]);
//         return booleanPointInPolygon(locationPoint, countryPolygon);
//     });

//     return filteredLocations;
// }

// countrySelect.addEventListener('change', function() {
//     const selectedCountry = this.value;
//     const filteredLocations = locations.filter(location => {
//         const locationPoint = point([location.longitude, location.latitude]);
//         return booleanPointInPolygon(locationPoint, countryPolygon);
//     });
//     addLocationsToMap(filteredLocations);
// });

// export { createMap, fetchStores, getBranchesByCountry, showBranchesByCountry, showAllBranches };

