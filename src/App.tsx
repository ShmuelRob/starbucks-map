/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import "ol/ol.css";
// import Map from "ol/Map";
// import View from "ol/View";
// import { OSM } from "ol/source";
// import { Vector as VectorSource } from "ol/source";
// import { Geometry, Point } from "ol/geom";
// import { Feature } from "ol";
// import { fromLonLat } from "ol/proj";
import "./App.css";
// import Branch from "./models/branch.model";
import getCountries from "./api/getCountries";
// import getAll from "./api/getAll";
import countryOption from "./models/countryOption.model";
import Sidebar from "./components/sidebar";
// import { fetchStores } from "./services/map";
import Branch from "./models/branch.model";
import getAll from "./api/getAll";
import MapComponent from "./components/mapComponent";
// import Sidebar from "./components/sidebar";

const App = () => {
  // const [map, setMap] = useState<Map | null>(null);
  // const [storeLayer, setStoreLayer] = useState<VectorLayer<
  // Feature<Geometry>
  // > | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<countryOption | null>(
    null
  );
  const [countries, setCountries] = useState<countryOption[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    getAll().then((branches) => {
      setBranches(branches);
      getCountries(branches).then((countries) => setCountries(countries));
    });
  }, []);

  // const fetchStores = async (layer: VectorLayer<Feature<Geometry>>) => {
  //   try {
  //     const branches = await getAll();
  //     const features = branches.map(
  //       (branch: Branch) =>
  //         new Feature({
  //           geometry: new Point(fromLonLat([branch.longitude, branch.latitude])),
  //         })
  //     );
  //     layer.getSource()?.clear();
  //     layer.getSource()?.addFeatures(features);
  //     console.log(features);
  //   } catch (error) {
  //     console.error("Error fetching stores:", error);
  //   }
  // };

  const handleCountryChange = async (selectedOption: countryOption | null) => {
    setSelectedCountry(selectedOption);
    if (selectedOption) {
      selectedCountry; //remove
      filterStoresByCountry(selectedOption.value);
    } else {
      // fetchStores(storeLayer!, branches);
    }
  };

  const filterStoresByCountry = async (countryCode: string) => {
    return countryCode;
  };

  // const filterStoresByCountry = async (countryCode) => {
  //   try {
  //     const response = await axios.get(`/filter-stores?countryCode=${countryCode}`);
  //     const stores = response.data;
  //     const features = stores.map(store => new Feature({
  //       geometry: new Point(fromLonLat([store.longitude, store.latitude])),
  //     }));
  //     storeLayer.getSource().clear();
  //     storeLayer.getSource().addFeatures(features);
  //   } catch (error) {
  //     console.error('Error filtering stores:', error);
  //   }
  // };

  return (
    <div className="App">
      {/* <Header title="hey" /> */}

      {/* <div className="sidebar-container"> */}
      <div className="sidebar">
        <Sidebar
          countries={countries}
          handleCountryChange={handleCountryChange}
        />
      </div>
      {/* <div id="list">#list</div> */}
      {/* </div> */}
      <MapComponent branches={branches} />
      {/* <div className="map-component"></div> */}
      {/* <div id="map" className="map"></div> */}
    </div>
  );
};

export default App;
