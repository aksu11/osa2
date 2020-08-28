import React from 'react'

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>
      <h2>Languages:</h2>
      <ul>
        {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img id='flag' src={country.flag} alt='flag' height='330' width='540'/>
    </div>
  )
}

export default Country