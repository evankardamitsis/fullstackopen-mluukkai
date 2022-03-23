import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'
import Search from './components/Search'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

 const handleFilter = (event) => {
  setFilter(event.target.value)
 }
  
  return (
    <div>
      <Search filter={filter} handleFilter={handleFilter} />
      <Countries countries={countries} filterValue={filter} />
    </div>
  )
}

export default App