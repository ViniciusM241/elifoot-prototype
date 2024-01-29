export default function CountryCircle({ countryCode }) {
  const countries = {
    BR: "country-brazil",
    PT: "country-portugal",
    US: "country-usa",
  };

  const className = countries?.[countryCode];

  if (className) {
    return <div className={`country-code ${className}`}></div>;
  }
}
