import countryOption from "../models/countryOption.model";
import SelectCountry from "./selectCountry"

type SidebarProps = {
    countries: countryOption[];
    handleCountryChange: (country: countryOption | null) => void;
    };

function Sidebar(props: SidebarProps) {
  return (
    <div><SelectCountry countries={props.countries} handleCountryChange={props.handleCountryChange} /></div>
  )
}


export default Sidebar
