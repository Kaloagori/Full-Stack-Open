import { useEffect, useState } from "react"
import countriesService from "./service/countries"

const ShowCountries = ({array}) => {
  if (array.length <= 4){
    
    if (array.length == 1){

      const nameCountry = array.map(country => country.name.common)

      return(
        <h1>{nameCountry}</h1>
      )
    }

    return(
      <div>
        {array.map(country =>
          <div key={country.cca2}>{country.name.common}</div>
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
        <ShowCountries array={filterNames}/>
      </div>
    </div>
  )
}

export default App
