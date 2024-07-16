import Branch from "../models/branch.model";
import countryOption from "../models/countryOption.model";
import getAll from "./getAll";


async function getCountries(branches?: Branch[]): Promise<countryOption[]> {
    const response = branches || await getAll();
    const countries = new Set<string>(response.map((branch) => branch.country));
    return [...countries].map((country) => ({ value: country, label: country }));
}

export default getCountries;
