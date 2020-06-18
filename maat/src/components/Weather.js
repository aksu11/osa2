import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({country}) => {

  const [data, setData] = useState([])

  useEffect(() => {
    const config = {
      headers: { "content-type": "application/json", "x-rapidapi-host":"community-open-weather-map.p.rapidapi.com", 
      "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`, "useQueryString": true },
      params: { id: `${process.env.REACT_APP_API_ID.toString()}`, units: "metric", q: `${country.capital},${country.alpha2Code}`} 
    }
    axios.get("https://community-open-weather-map.p.rapidapi.com/weather", config)
      .then((response)=>{
        const weather = { main : response.data.weather[0].icon, temp: response.data.main.temp, 
          windSpeed: response.data.wind.speed, windDirection: response.data.wind.deg }
        setData(weather)
        console.log(weather.wind.speed)
      })
      .catch((error)=>{
        console.log(error)
      })
  }, [country])

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <div>
        <b>Temperature: </b>{Math.round(data.temp)} Celsius
      </div>
      <div>
        <img alt="" src={`http://openweathermap.org/img/wn/${data.main}@2x.png`}></img>
      </div>
      <div>
        <b>Wind: </b>{data.windSpeed} m/s Direction {data.windDirection}&#176;
      </div>
    </div>
  )
}

export default Weather