import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(()=>{
    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
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

    const existPerson = persons.find(person => person.name === newName)
    if (existPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update({...existPerson, number: newNumber})
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== existPerson.id ? person : updatedPerson))
          })
      }
    } else {
      let newPerson = {name: newName, number: newNumber}

      personService
        .create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDeletion = (id) => {
    personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
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
      <Persons persons={persons} filter={newFilter} onDelete={handleDeletion}/> 
    </div>
  )
}

export default App