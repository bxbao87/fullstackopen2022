import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onSubmitForm = (event) => {
    event.preventDefault()
    let tmp = persons.concat({name: newName})
    setPersons(tmp)
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmitForm}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={onNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}> {person.name} </div>)}
    </div>
  )
}

export default App