import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country.js'
import Weather from './components/Weather.js'

function App() {
  const [ countries, setCountries ] = useState([])
  const [ country, setCountry ] = useState(null)
  const [ countriesToShow, setCountriesToShow ] = useState([])
  const [ defining, setDefining ] = useState('')
  const [ notification, setNotification ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleDefiningChange = (event) => {
    setDefining(event.target.value)
    const arr = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    if(arr.length > 10) {
      setCountry(null)
      if (arr.length === countries.length) setNotification('')
      else setNotification('too many matches, specify another filter')
      setCountriesToShow([])
    } else if (arr.length === 1) {
      setCountry(arr[0])
      setCountriesToShow([])
      setNotification('')
    } else {
      setCountry(null)
      setCountriesToShow(arr)
      setNotification('')
    }
  }

  const showCountry = (name) => {
    return ( () => setCountry(countriesToShow.find(c => c.name === name)) )
  }

  return (
    <div>
      <div>
        find countries: <input onChange={handleDefiningChange} value={defining} />
      </div>
      <p>
        {notification}
      </p>
      {countriesToShow.map(country => <div key={country.name}>{country.name} <button onClick={showCountry(country.name)}>show</button></div>)}
      {country ? <div><Country country={country}/><Weather country={country}/></div> : null}
    </div>
  )
}

export default App;
