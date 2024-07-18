import Branch from '../models/branch.model.ts';
import countryOption from '../models/countryOption.model.ts';
import getAllBranches from './getBranches';

async function getCountries(branches?: Branch[]): Promise<countryOption[]> {
    const response = branches || (await getAllBranches());
    const countries = new Set<string>(response.map((branch) => branch.country));
    return [...countries].map((country) => ({
        value: country,
        label: country,
    }));
}

export default getCountries;
