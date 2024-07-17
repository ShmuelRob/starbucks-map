import { Feature, Map, View } from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Branch from '../models/branch.model';
import { Geometry, Point } from 'ol/geom';
import { alphaCode } from '../utils/getCountryAlphaCode';
import getCountryCoords from '../utils/getCountryCoords';
import { booleanPointInPolygon, multiPolygon, point, polygon } from '@turf/turf';
import { Position } from 'geojson';



function createMap() {
    const map = new Map({
        target: 'map',
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
    return map;
}

function createLayer() {
    const vectorSource = new VectorSource();
    const branchLayer = new VectorLayer({
        source: vectorSource
    });
    return branchLayer;
}

function getAllStores(layer: VectorLayer<Feature<Geometry>>, branches: Branch[]) {
    const features = branches.map(
        (branch: Branch) =>
            new Feature({
                geometry: new Point(fromLonLat([branch.longitude, branch.latitude])),
                branch: branch,
            })
    );
    layer.getSource()?.clear();
    layer.getSource()?.addFeatures(features);
}

async function getStoresByCountry(layer: VectorLayer<Feature<Geometry>>, branches: Branch[], countryCode: alphaCode) {
    const country = await getCountryCoords(countryCode);
    if (!country) {
        return getAllStores(layer, branches);
    }

    const countryPolygon = country.geometry.type === "Polygon"
        ? polygon(country.geometry.coordinates as Position[][])
        : multiPolygon(country.geometry.coordinates as Position[][][]);
    // console.log(this.branches);
    const filteredLocations = branches.filter((branch: Branch) => {
        return country && booleanPointInPolygon(point([branch.longitude, branch.latitude]), countryPolygon.geometry);
    })
    const features = filteredLocations.map(
        (branch: Branch) =>
            new Feature({
                geometry: new Point(fromLonLat([branch.longitude, branch.latitude])),
                branch: branch,
            })
    );
    layer.getSource()?.clear();
    layer.getSource()?.addFeatures(features);
}

export { createMap, createLayer, getAllStores, getStoresByCountry };