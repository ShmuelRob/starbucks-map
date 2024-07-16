import Select from "react-select";
import countryOption from "../models/countryOption.model";

type selectCountryProps = {
  countries: countryOption[];
  handleCountryChange: (country: countryOption | null) => void;
};

function SelectCountry(props: selectCountryProps) {
  return (
    <Select
      options={props.countries}
      onChange={props.handleCountryChange}
      isClearable
    />
  );
}

export default SelectCountry;
