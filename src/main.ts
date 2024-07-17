import './style.css'
import getBranches from './data/getBranches';
import getCountries from './data/getCountries';
import createSelect from './utils/createSelect';
import { createLayer, createMap, getAllStores, getStoresByCountry } from './services/mapFunctions';
import { alphaCode } from './utils/getCountryAlphaCode';


const branches = await getBranches();
// const map = new OlMap(branches);
const map = createMap();
const layer = createLayer();
map.addLayer(layer);
getAllStores(layer, branches);

const countryList = await getCountries();

function getStoresByCountryWrapper(countryCode: alphaCode) {
    return getStoresByCountry(layer, branches, countryCode);
}


document.getElementById('country-select-div')?.appendChild(createSelect(countryList, getStoresByCountryWrapper));