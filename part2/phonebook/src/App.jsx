import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons"

const Notification = ({message , type}) => {
    if(message === null) {
      return null
    }

    return(
      <div className={type === 'error' ? 'error' : 'success'}>
        {message}
      </div>
    )
  }

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

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
    
    
    if(persons.find((person) => person.name === newName)){
      if(window.confirm(`${newName} is already to phonebook, replace the old number with a new one?`)){

        const numberReplace = persons.find(p => p.name === newName)
        const id = numberReplace.id
        const changeNumber = {...numberReplace, number: newNumber}

        personService
          .update(id, changeNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setMessage(`Changed ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else{
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deletePersona = id => {
    const person = persons.find(p => p.id === id)

    if(window.confirm(`Delete ${person.name} ?`)){
      personService
      .dlt(id)
      .then(() =>{
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        setMessageType('error')
        setMessage(
          `Information of ${person.name} has already been removed from server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
      <Notification message={message} type={messageType}/>
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