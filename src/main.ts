import './style.css'
import getBranches from './data/getBranches';
import getCountries from './data/getCountries';
import createSelect from './utils/createSelect';
import { createLayer, createMap, getAllStores, getStoresByCountry } from './services/mapFunctions';
import { alphaCode } from './utils/getCountryAlphaCode';


// get all branches
const branches = await getBranches();

// create a map and layer
const map = createMap();
const layer = createLayer();
map.addLayer(layer);
getAllStores(layer, branches);

// get all countries
const countryList = await getCountries();

function getStoresByCountryWrapper(countryCode: alphaCode) {
    return getStoresByCountry(layer, branches, countryCode);
}

// create a select element with all countries, and call getStoresByCountry when the selected country changes as callback
document.getElementById('country-select-div')?.appendChild(createSelect(countryList, getStoresByCountryWrapper));