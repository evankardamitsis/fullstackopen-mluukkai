import { useState, useEffect } from 'react'
import axios from 'axios'

import Alert from './components/Alert'
import Persons from './components/Persons'
import Form from './components/Form'
import Search from './components/Search'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

//get names from json server using axios
useEffect(() => {
  axios
    .get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
}, [])

  
  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber
    }
    const checkName = persons.find(person =>
      person.name.toLowerCase() === personObject.name.toLowerCase())

      if(checkName) {
        Alert(personObject)
      }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsSearch = filter === '' ? persons: persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())) 

  return (
    <div>
      <h2>Phonebook</h2>
      <Search filter={filter} handleFilter={handleFilter} />
      <Form 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsSearch} />
    </div>
  )
}

export default App
