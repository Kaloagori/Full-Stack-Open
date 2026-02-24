import { useEffect, useState } from "react"
import countriesService from "./service/countries"

const ShowCountries = ({array , buttonHandle}) => {
  
  if (array.length <= 4){
    
    if (array.length == 1){

      const country = array[0]

      return(
        <div>
          <h1>{country.name.common}</h1>
          <div>Capital {country.capital}</div>
          <div>Area {country.area}</div>
          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} />
          <h2>Weather in {country.capital}</h2>
          <div>Temperature</div>
          <div>Wind</div>
        </div>
      )
    }

    return(
      <div>
        {array.map(country =>
          <div key={country.cca2}>
            {country.name.common}
            <button onClick={() => buttonHandle(country.name.common)}>Show</button>
          </div>
        )}
      </div>
    )
  } 

  return(
    <div>
      Too many matches, specify another filter
    </div>
  )
}

const App = () => {
  
  const [name, setName] = useState('')
  const [countries, setCountries] = useState([])
  
  useEffect(() =>{
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])


  const handleNameChange = event => {
    setName(event.target.value)
  }  

  const filterNames = name === ''
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(name.toLowerCase()))
  
  return(
    <div>
      <div>find countries <input value={name} onChange={handleNameChange}/></div>
      <div>
        <ShowCountries array={filterNames} buttonHandle={setName} />
      </div>
    </div>
  )
}

export default App
