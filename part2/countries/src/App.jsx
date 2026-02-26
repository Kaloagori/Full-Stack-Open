import { useEffect, useState } from "react"
import countriesService from "./service/countries"
import ShowCountries from "./components/ShowCountries"

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
