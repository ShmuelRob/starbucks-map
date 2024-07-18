import { Feature, Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Branch from '../models/branch.model';
import { Geometry, Point } from 'ol/geom';
import { alphaCode } from '../utils/getCountryAlphaCode';
import getCountryCoords from '../utils/getCountryCoords';
import {
    booleanPointInPolygon,
    multiPolygon,
    point,
    polygon,
} from '@turf/turf';
import { Position } from 'geojson';

function createMap() {
    const map = new Map({
        // specify the id of the div element that will contain the map
        target: 'map',
        // add layers of points and the map
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
        ],
        // set where the map is centered and how much zoom
        view: new View({
            center: fromLonLat([0, 0]),
            zoom: 2,
        }),
    });
    return map;
}

function createLayer() {
    // create a vector source that will hold the points
    const vectorSource = new VectorSource();

    // create a vector layer that will use the vector source
    const branchLayer = new VectorLayer({
        source: vectorSource,
    });
    return branchLayer;
}

function getAllStores(
    layer: VectorLayer<Feature<Geometry>>,
    branches: Branch[]
) {
    const features = branches.map(
        (branch: Branch) =>
            // create a feature with a point geometry and the branch as the feature's property
            new Feature({
                geometry: new Point(
                    fromLonLat([branch.longitude, branch.latitude])
                ),
                branch: branch,
            })
    );

    // clear the source of the vector layer and add the features
    layer.getSource()?.clear();
    layer.getSource()?.addFeatures(features);
}

async function getStoresByCountry(
    layer: VectorLayer<Feature<Geometry>>,
    branches: Branch[],
    countryCode: alphaCode
) {
    // get the country's polygon from the API
    const country = await getCountryCoords(countryCode);
    if (!country) {
        // if the country is not found, return all stores
        return getAllStores(layer, branches);
    }

    // create a polygon or multipolygon from the country's coordinates
    const countryPolygon =
        country.geometry.type === 'Polygon'
            ? polygon(country.geometry.coordinates as Position[][])
            : multiPolygon(country.geometry.coordinates as Position[][][]);

    // filter the branches to only include the ones in the country
    const filteredLocations = branches.filter((branch: Branch) => {
        return (
            country &&
            booleanPointInPolygon(
                point([branch.longitude, branch.latitude]),
                countryPolygon.geometry
            )
        );
    });
    // create features from the filtered locations
    const features = filteredLocations.map(
        (branch: Branch) =>
            new Feature({
                geometry: new Point(
                    fromLonLat([branch.longitude, branch.latitude])
                ),
                branch: branch,
            })
    );

    // clear the source of the vector layer and add the features
    layer.getSource()?.clear();
    layer.getSource()?.addFeatures(features);
}

export { createMap, createLayer, getAllStores, getStoresByCountry };
