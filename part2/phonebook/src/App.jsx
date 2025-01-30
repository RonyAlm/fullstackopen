import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  const handleChangeName = (event) => {
    const value = event.target.value
    const found = persons.find(person => person.name === value)
    if (found) return alert(`${value} is already added to phonebook`)
    setNewName(value)
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])


  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setSearch(event.target.value)
    const filtered = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilter(filtered)
  }

  const addPerson = (event) => {
    event.preventDefault()
    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App