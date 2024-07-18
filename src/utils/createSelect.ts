import countryOption from '../models/countryOption.model';
import { alphaCode } from './getCountryAlphaCode';

function createSelect(
    countries: countryOption[],
    // eslint-disable-next-line
    onChange: (country: alphaCode) => Promise<void>
) {
    // create a select element
    const element = document.createElement('select');
    element.name = 'select country';
    element.id = 'country-select';

    // create an option for all countries
    const option = createOption({ value: 'ALL', label: 'All countries' });
    element.appendChild(option);

    // create an option for each country
    countries.forEach((country: countryOption) =>
        element.appendChild(createOption(country))
    );

    // when the select element changes, call the onChange function with the selected country
    element.onchange = async (event) => {
        const selectedCountry = (event.target as HTMLSelectElement).value;
        await onChange(selectedCountry as alphaCode);
    };

    return element;
}

function createOption(country: countryOption) {
    // create an option element with the country's value and label
    const option = document.createElement('option');
    option.value = country.value;
    option.text = country.label;
    return option;
}

export default createSelect;
