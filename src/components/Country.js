import React from "react";

const Country = ({ country }) => {
  if (!country) {
    return <div>Not found...</div>;
  }
  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div>
      <div>capital {country.capital}</div>
      <img
        src={country.flag}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  );
};

export default Country;
