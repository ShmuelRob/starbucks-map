import Branch from "../models/branch.model";
import countryOption from "../models/countryOption.model";
import getAllBranches from "./getAllBranches";


async function getCountries(branches?: Branch[]): Promise<countryOption[]> {
    const response = branches || await getAllBranches();
    const countries = new Set<string>(response.map((branch) => branch.country));
    return [...countries].map((country) => ({ value: country, label: country }));
}

export default getCountries;
