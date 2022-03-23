import React, { useState } from 'react'

import CountryInfo from './CountryInfo'

const Country = ({ country }) => {
  const [ show, setShow ] = useState(false)
  
  const handleClick = () => {
    setShow(!show)
  }

  return (
  <li>
    {country.name} <button onClick={handleClick}>show</button>
    {show && <CountryInfo country={country} />}
  </li>
  )
}

export default Country