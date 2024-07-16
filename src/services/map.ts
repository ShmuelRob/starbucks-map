import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM } from "ol/source";
import { Vector as VectorSource } from "ol/source";
import { Geometry, Point } from "ol/geom";
import { Feature } from "ol";
import { fromLonLat } from "ol/proj";
import Branch from "../models/branch.model";


function createMap(branches: Branch[]) {
    const initialMap = new Map({
        target: "map",
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
        ],
        view: new View({
            center: fromLonLat([0, 0]),
            zoom: 2,
        }),
    });

    const initialStoreLayer = new VectorLayer({
        source: new VectorSource(),
    });
    initialMap.addLayer(initialStoreLayer);
    fetchStores(initialStoreLayer, branches);
    return { initialMap, initialStoreLayer };
}


async function fetchStores(layer: VectorLayer<Feature<Geometry>>, branches: Branch[]) {
    try {
        const features = branches.map(
            (branch: Branch) =>
                new Feature({
                    geometry: new Point(fromLonLat([branch.longitude, branch.latitude])),
                })
        );
        layer.getSource()?.clear();
        layer.getSource()?.addFeatures(features);
    } catch (error) {
        console.error("Error fetching stores:", error);
    }
}

export {createMap, fetchStores};
