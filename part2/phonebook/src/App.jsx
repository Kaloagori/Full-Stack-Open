import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])

  const [newName, setNewName] = useState('')

  const addPersona = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }

    const verifyPerson = persons.find((person) => person === newName) 
      ? `${newName} is already added to phonebook`
      : setPersons(persons.concat(personObject))
    
    setNewName('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }


  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersona}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <div key={person.name}>{person.name}</div>
        ))}
      </div>
    </div>
  )
}

export default App