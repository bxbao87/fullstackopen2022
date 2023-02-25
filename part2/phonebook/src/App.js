import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNoti, setNewNoti] = useState(null)
  const [userAction, setUserAction] = useState('added')

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
            setUserAction('updated')
            setNewNoti(`Updated ${newName}`)
            setTimeout(()=>{
              setNewNoti(null)
            }, 5000)

            setPersons(persons.map(person => person.id !== existPerson.id ? person : updatedPerson))
          })
          .catch(error => {
            setUserAction('deleted')
            setNewNoti(`Information of ${newName} has already been removed from server`)
            setTimeout(()=>{
              setNewNoti(null)
            }, 5000)

            setPersons(persons.filter(person => person.name !== newName))
          })
      }
    } else {
      let newPerson = {name: newName, number: newNumber}

      personService
        .create(newPerson)
        .then(createdPerson => {
          setUserAction('added')
          setNewNoti(`Added ${newName}`)
          setTimeout(()=>{
            setNewNoti(null)
          }, 5000)

          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDeletion = (id) => {
    const callback = () => {
      let person = persons.find(person => person.id === id)
        setUserAction('deleted')
        setNewNoti(`Information of ${person.name} has already been removed from server`)
        setTimeout(()=>{
          setNewNoti(null)
        }, 5000)

        setPersons(persons.filter(person => person.id !== id))
    }
    
    personService
      .remove(id)
      .then(response => {
        let person = persons.find(person => person.id === id)
        setUserAction('deleted')
        setNewNoti(`Information of ${person.name} has already been removed from server`)
        setTimeout(()=>{
          setNewNoti(null)
        }, 5000)

        setPersons(persons.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNoti} action={userAction}/>
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