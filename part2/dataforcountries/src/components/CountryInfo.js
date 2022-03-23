import React from 'react'

import Weather from './Weather'

const CountryInfo = ({ country }) => {
  return (
    <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>languages</h2>
        <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} width="100px" height="100px" alt="country flag" />
        <Weather capital={country.capital} />
    </div>
  )
}

export default CountryInfo