import Map from "ol/Map";
import Branch from "../models/branch.model";
import { Geometry, Point } from "ol/geom";
import Feature from "ol/Feature";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { OSM } from "ol/source";
import { View } from "ol";
import { fromLonLat } from "ol/proj";
import { alphaCode } from "./getCountryAlphaCode";
import getCountryCoords from "./getCountryCoords";
import { booleanPointInPolygon, multiPolygon, point, polygon } from "@turf/turf";
import { Position } from "geojson";


class OlMap {
    private map: Map;
    private branches: Branch[];
    private vectorSource: VectorSource;
    private initialStoreLayer: VectorLayer<Feature<Geometry>>;

    constructor(branches: Branch[]) {
        this.branches = branches;
        this.map = this.createMap();

        // this.initialStoreLayer = new VectorLayer({
            // source: new VectorSource(),
        // });
        this.vectorSource = new VectorSource();
        this.initialStoreLayer = new VectorLayer({
            source: this.vectorSource
        });
        this.map.addLayer(this.initialStoreLayer);
    }

    private createMap() {
        return new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
            ],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 2,
            }),
        });
    }

    async fetchStores(onUpdate?: () => void) {
        // await this.showStoresByCountry("CN")
        try {
            const features = this.branches.map(
                (branch: Branch) =>
                    new Feature({
                        geometry: new Point(fromLonLat([branch.longitude, branch.latitude])),
                        branch: branch,
                    })
            );
            // this.initialStoreLayer = new VectorLayer({
                // source: new VectorSource(),
            // });
            this.vectorSource.clear();
            this.vectorSource.addFeatures(features);
            // this.initialStoreLayer.getSource()?.clear();
            // this.initialStoreLayer.getSource()?.addFeatures(features);
            this.initialStoreLayer.changed();
            this.map.render();
            if (onUpdate) {
                onUpdate();
            }
        } catch (error) {
            console.error("Error fetching stores:", error);
        }
    }


    async showStoresByCountry(countryCode: alphaCode = "US", onUpdate?: () => void) {
        try {
            const country = await getCountryCoords(countryCode);
            
            const countryPolygon = country.geometry.type === "Polygon" ? polygon(country.geometry.coordinates as Position[][]) : multiPolygon(country.geometry.coordinates as Position[][][]);
            // console.log(coords);
            // const country = 
            const filteredLocations = this.branches.filter((branch: Branch) => {
                return country && booleanPointInPolygon(point([branch.longitude, branch.latitude]), countryPolygon.geometry);
            })
            const features = filteredLocations.map(
                (branch: Branch) =>
                    new Feature({
                        geometry: new Point(fromLonLat([branch.longitude, branch.latitude])),
                        branch: branch,
                    })
            );
            // console.log(features);
            // console.log(4);
            // this.initialStoreLayer.setSource
            // this.initialStoreLayer = new VectorLayer({
                // source: new VectorSource(),
            // });
            this.vectorSource.clear();
            this.vectorSource.addFeatures(features);
            // this.initialStoreLayer.getSource()?.clear();
            // this.initialStoreLayer.getSource()?.forEachFeature((feature) => console.log(feature));
            // this.initialStoreLayer.getSource()?.addFeatures(features);
            // this.initialStoreLayer.getSource()?.forEachFeature((feature) => console.log(feature));
            this.initialStoreLayer.changed();
            this.map.render();
            if (onUpdate) {
                onUpdate();
            }
        } catch (error) {
            console.error("Error fetching stores:!!", error);
        }


    }

    // addLocationsToMap(filteredLocations: Branch[]) {
    //     const features = filteredLocations.map(
    //         (location: Branch) =>
    //             new Feature({
    //                 geometry: new Point(fromLonLat([location.longitude, location.latitude])),
    //                 branch: location,
    //             })
    //     );

    //     this.initialStoreLayer.getSource()?.clear();
    //     this.initialStoreLayer.getSource()?.addFeatures(features);
    // }

}

export default OlMap;