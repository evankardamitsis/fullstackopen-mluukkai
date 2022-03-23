import React from 'react'

import Country from './Country'
import CountryInfo from './CountryInfo'

const Countries = ({ countries, filterValue }) => {
    let results = []
    if (filterValue.length > 0) {
        results = countries.filter(country => 
            country.name.toLowerCase().includes(filterValue.toLowerCase()))
    } else {
      results = countries
    }
      
    if (results.length > 10) {
      return 'Too many matches, specify another filter'
      
    } else if (results.length === 1) {
      return (
        <div>
        <CountryInfo country={results[0]} />
        </div>
      )
    } else {
      return (
        <div>
          <ul>
            {results.map(country =>
              <Country
                  key={country.name} 
                  country={country}  
              />
            )}
          </ul>
        </div>
      )
    }
  }

export default Countries