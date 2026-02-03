import { useEffect, useState } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
   const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response =>{
        setPersons(response.data)
      })
  }, [])

  const addPersona = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const verifyPerson = persons.find((person) => person.name === newName) 
      ? window.alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filterPerson = filter === ''
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  return(
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPersona} valueName={newName} valueNumber={newNumber} 
        onChangeName={handlePersonChange} onChangeNumber={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons person={filterPerson}/>
    </div>
  )
}

export default App 