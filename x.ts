// import Map from "ol/Map";
// import View from "ol/View";
// import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
// import { OSM } from "ol/source";
// import { Vector as VectorSource } from "ol/source";
// import { Geometry, Point } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";


// document.addEventListener("DOMContentLoaded", function() {
//     const countrySelect = document.getElementById('country-select');

//     // Fetch Starbucks locations
//     async function fetchStarbucksLocations() {
//         const response = await fetch('URL_TO_FETCH_STARBUCKS_LOCATIONS'); // Replace with the actual URL
//         const data = await response.json();
//         return data.locations;
//     }

//     // Initialize the map
//     const map = new Map({
//         target: 'map',
//         layers: [
//             new TileLayer({
//                 source: new OSM()
//             })
//         ],
//         view: new View({
//             center: fromLonLat([0, 0]),
//             zoom: 2
//         })
//     });

//     // Function to add Starbucks locations to the map
//     function addLocationsToMap(locations) {
//         const features = locations.map(location => new Feature({
//             geometry: new Point(fromLonLat([location.longitude, location.latitude])),
//             name: location.name
//         }));

//         const vectorSource = new VectorSource({
//             features: features
//         });

//         const vectorLayer = new VectorLayer({
//             source: vectorSource
//         });

//         map.addLayer(vectorLayer);
//     }

//     // Fetch country list and populate select box
//     async function fetchCountryList() {
//         const response = await fetch('URL_TO_FETCH_COUNTRY_LIST'); // Replace with the actual URL
//         const data = await response.json();
//         return data.countries;
//     }

//     async function init() {
//         const locations = await fetchStarbucksLocations();
//         addLocationsToMap(locations);

//         const countries = await fetchCountryList();
//         countries.forEach(country => {
//             const option = document.createElement('option');
//             option.value = country.name;
//             option.textContent = country.name;
//             countrySelect.appendChild(option);
//         });

//         countrySelect.addEventListener('change', function() {
//             const selectedCountry = this.value;
//             const filteredLocations = locations.filter(location => {
//                 const point = turf.point([location.longitude, location.latitude]);
//                 const polygon = turf.polygon(selectedCountry.geometry.coordinates);
//                 return turf.booleanPointInPolygon(point, polygon);
//             });
//             addLocationsToMap(filteredLocations);
//         });
//     }

//     init();
// });
