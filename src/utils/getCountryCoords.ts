import axios from 'axios';
import { Position } from 'geojson';
import getCountryAlphaCode, { alphaCode } from './getCountryAlphaCode';

type countryCoords =  {
    id: string;
    properties: {
        name: string;
    }
    geometry: {
        type: string;
        coordinates: Position[][] | Position[][][];
    }
}



async function getCountryCoords(countryAlpha2: alphaCode): Promise<countryCoords | null>  {
    try {
        const countries = (await axios.get(import.meta.env.VITE_COUNTRY_BOUNDARIES_URL)).data.features as countryCoords[];
        const country = countries.find((c: countryCoords) => c.id == getCountryAlphaCode(countryAlpha2));
        if (country) {
            return country;
        } else {
            return null
        }
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
}

export default getCountryCoords;
