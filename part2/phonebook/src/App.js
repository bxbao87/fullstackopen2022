import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
      let tmp = persons.concat({name: newName, number: newNumber, id: persons.length+1})
      setPersons(tmp)
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={newFilter} onChange={onFilterChange} /> </div>

      <h2>add a new</h2>
      <form onSubmit={onSubmitForm}>
        <div>name: <input value={newName} onChange={onNameChange} /> </div>
        <div>number: <input value={newNumber} onChange={onNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person => <div key={person.id}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App