import { useEffect, useState } from 'react'
import personServices from './services/persons.js'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

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
    const found = persons.find(person => person.name === newName)
    if (found) {
      const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmed) {
        const personObject = {
          name: newName,
          number: newNumber
        }
        personServices
          .update(found.id, personObject)
          .then(res => {
            setPersons(persons.map(person => person.id !== found.id ? person : res))
            setNewName('')
            setNewNumber('')
          })
      }

    } else {

      const personObject = {
        name: newName,
        number: newNumber
      }
      personServices
        .create(personObject)
        .then(res => {
          setPersons(persons.concat(res))
          setNewName('')
          setNewNumber('')
        })

    }

  }

  const deletePerson = (id) => {
    if (!window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) return
    personServices
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
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
      <Persons deletePerson={deletePerson} persons={persons} filter={filter} />
    </div>
  )
}

export default App