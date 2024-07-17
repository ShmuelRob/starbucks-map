import countryOption from '../models/countryOption.model';
import { alphaCode } from './getCountryAlphaCode';

function createSelect(countries: countryOption[], onChange: (country: alphaCode) => Promise<void>) {
    const element = document.createElement('select');
    element.name = 'select country';
    element.id = 'country-select';

    const option = createOption({ value: 'ALL', label: 'All countries' });
    element.appendChild(option);

    countries.forEach((country: countryOption) => element.appendChild(createOption(country)));

    element.onchange = async (event) => {
        const selectedCountry = (event.target as HTMLSelectElement).value;
        await onChange(selectedCountry as alphaCode);
    }

    return element;
}

function createOption(country: countryOption) {
    const option = document.createElement('option');
    option.value = country.value;
    option.text = country.label;
    return option;
}


export default createSelect;
