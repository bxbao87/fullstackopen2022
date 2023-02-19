import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(()=>{
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const onNameChange = (event) => {
    setNewName(event.target.value)  
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const onSubmitForm = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      let newPerson = {name: newName, number: newNumber}

      axios.post("http://localhost:3001/persons", newPerson).then(response => {
        setPersons(persons.concat(response.data))
        // console.log("persons", persons)
        setNewName('')
        setNewNumber('')
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} onFilterChange={onFilterChange} />

      <h3>Add a new</h3>
      <PersonForm newName={newName} onNameChange={onNameChange}
                  newNumber={newNumber} onNumberChange={onNumberChange}
                  onSubmitForm={onSubmitForm} />

      
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter} /> 
    </div>
  )
}

export default App