import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const onNameChange = (event) => {
    setNewName(event.target.value)  
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onSubmitForm = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      let tmp = persons.concat({name: newName, number: newNumber})
      setPersons(tmp)
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmitForm}>
        <div>name: <input value={newName} onChange={onNameChange} /> </div>
        <div>number: <input value={newNumber} onChange={onNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App