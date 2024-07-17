/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
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
import countryOption from "./models/countryOption.model";
import Sidebar from "./components/sidebar";
// import { fetchStores } from "./services/map";
import Branch from "./models/branch.model";
import getAllBranches from "./api/getAllBranches";
import MapComponent from "./components/mapComponent";
// import {  showAllBranches } from "./services/mapFunctions";
import { isAlphaCode } from "./services/getCountryAlphaCode";
import OlMap from "./services/olMap";
// import Sidebar from "./components/sidebar";

const App = () => {
  const [map, setMap] = useState<OlMap | null>(null);
  // const [storeLayer, setStoreLayer] = useState<VectorLayer<
  // Feature<Geometry>
  // > | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<countryOption | null>(
    null
  );
  const [countries, setCountries] = useState<countryOption[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [updateCounter, setUpdateCounter] = useState(0); // Step 1: Add state to track updates


  useEffect(() => {
    // This effect will run every time updateCounter changes, i.e., after showStoresByCountry updates
    console.log("Map updated, triggering re-render");
    // You can add any additional logic here if needed
  }, [updateCounter]);


  useEffect(() => {
    getAllBranches().then((fetchedBranches) => {
      setBranches(fetchedBranches);
      getCountries(fetchedBranches).then((countries) =>
        setCountries(countries)
      );
      const newMap = new OlMap(fetchedBranches);
      setMap(newMap);
      newMap.fetchStores();
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (selectedCountry?.value && isAlphaCode(selectedCountry.value)) {
          // console.log("not null");
          await map?.showStoresByCountry(selectedCountry.value, () => {
            setUpdateCounter((prev) => prev + 1); 
          });
        } else {
          // console.log("null");
          await map?.fetchStores(() => {
            setUpdateCounter((prev) => prev + 1);
          });
        }
        // await doSomething();
      } catch (err) {
        console.error(err);
      }
    })();



  }, [selectedCountry, map]);

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
  };

  // const filterStoresByCountry = async (countryCode: string) => {
  // alert(countryCode);
  // return countryCode;
  // };

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
      <MapComponent map={map} />
      {/* <div className="map-component"></div> */}
      {/* <div id="map" className="map"></div> */}
    </div>
  );
};

export default App;
