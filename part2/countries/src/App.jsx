import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY

const Country = (props) => {
  const { country, infoWeather } = props

  return (
    <article>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Lenguages:</h3>
      <ul>
        {
          Object.entries(country.languages).map((language, index) => (
            <li key={index}>{language[1]}</li>
          ))
        }
      </ul>
      <img src={country.flags.svg} alt={country.name.common} width="200" />

      {
        infoWeather &&
        <div>
          <h3>Weather in {country.name.common}</h3>
          <p>Temperature: {Math.round(infoWeather.main.temp - 273.15)}° C </p>
          <img
            src={`http://openweathermap.org/img/wn/${infoWeather.weather[0].icon}@2x.png`}
            alt={infoWeather.weather[0].main} width={"100"}
          />
          <p>Wind: {infoWeather.wind.speed} m/s </p>
        </div>
      }

    </article>
  )
}

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesFilter, setCountriesFilter] = useState([])
  const [country, setCountry] = useState([])
  const [countryName, setCountryName] = useState('Argentina')
  const [showCountry, setShowCountry] = useState(false)
  const [weather, setWeather] = useState([])

  const handleChange = (event) => {

    const searched = event.target.value;

    if (searched) {
      setShowCountry(false)
    }

    const countriesFilter = countries.filter(country => {
      const name = country.name.common.toLowerCase();
      return name.includes(searched.toLowerCase())
    })

    if (countriesFilter.length === 1) {
      setCountryName(countriesFilter[0].name.common)
    }

    setCountriesFilter(countriesFilter)
    setSearch(searched)
  }

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((res) => {
        setCountries(res.data)
      })
  }, [])

  useEffect(() => {
    if (countryName) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${api_key}`)
        .then((res) => {
          setWeather(res.data)
        })
    }
  }, [countryName])

  const handleClick = (country) => {
    if (showCountry) {
      setShowCountry(false)
    } else {
      setShowCountry(true)
    }
    setCountry(country)
    setCountryName(country.name.common)
  }

  return (
    <>
      <h1>COUNTRIES</h1>
      <div>
        find countries <input value={search} onChange={handleChange} />
      </div>
      <div>
        {
          showCountry &&
          <Country country={country} infoWeather={weather} />
        }
        {
          countriesFilter.length > 10 ? <p>Too many matches, specify another filter</p> :
            countriesFilter.length === 1 ?
              <>
                {
                  countriesFilter.map(country => (
                    <Country key={`${country.cca2}-${country.cca3}`} country={country} infoWeather={weather} />
                  ))
                }
              </>
              :
              countriesFilter.map(val => (
                <div key={val.name.length}>
                  <p>{val.name.common}
                    <button onClick={() => handleClick(val)}>
                      show
                    </button>
                  </p>
                </div>
              ))
        }
      </div>

    </>
  )
}

export default App
