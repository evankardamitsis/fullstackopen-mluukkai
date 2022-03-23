import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
  const access_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState([])

  useEffect(() => {
      axios.get(`http://api.weatherapi.com/v1/current.json?key=${access_key}&q=${capital}&aqi=yes`)
      .then(response => {
          setWeather(response.data.current)
      })
  }, [])
    

  return (
    <div>
        <h2>Weather in {capital}</h2>
        <p>temperature {weather.temp_c} Celcius</p>
        <img src={weather.condition.icon} alt="weather icon" />
        <p>wind {weather.wind_kph} m/s</p>
    </div>
  )
}

export default Weather