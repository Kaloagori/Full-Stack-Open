import { useEffect, useState } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPersona = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    persons.find((person) => person.name === newName) 
      ? window.alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
      : personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
  }

  const deletePersona = id => {
    const person = persons.find(p => p.id === id)

    if(window.confirm(`Delete ${person.name} ?`)){
      personService
      .dlt(id)
      .then(() =>{
        setPersons(persons.filter(p => p.id !== id))
      })
    }
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
      <Persons person={filterPerson} label={"delete"} handle={deletePersona} />
    </div>
  )
}

export default App 