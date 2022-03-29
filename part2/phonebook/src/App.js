import { useState, useEffect } from 'react'

import Alert from './components/Alert'
import Persons from './components/Persons'
import Form from './components/Form'
import Search from './components/Search'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

useEffect(() => {
  personService
  .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
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

      if(checkName && checkName.number === newNumber) {
        Alert(personObject)
      }
      if(checkName && checkName.number !== newNumber){
        const confirmNumber = window.confirm(`${checkName.name} is already in the phonebook, replace the old number with a new one?`)

        if(confirmNumber){
          const nameUpdate = {...checkName, number:newNumber}
          personService
           .update(checkName.id, nameUpdate)
           .then(returnedName => {
             setPersons(persons.map(person=> person.id !== checkName.id ? person : returnedName
              ))
              setNotification({
                text:`${checkName.name}'s number was updated.`,
                type:'notification'
              })
              setTimeout(() => setNotification(null), 5000)
           })
           .catch(error =>
            setPersons(persons.filter(person => person.name !== checkName.name
              )))
              setNotification({
                text:`Information of ${checkName.name} has already been removed from the server.`,
                type: 'error'
              })
              setTimeout(() => setNotification(null), 5000)

        }
      }
      if(!checkName){
        personService
          .create(personObject)
          .then(returnedName => {
            setPersons(persons.concat(returnedName))
          })
          .catch(error => {
            setNotification({
              text:error.response.data.error,
              type:'error'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          setNotification({
            text:`${personObject.name} added to the server`,
            type:'notification'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
      }
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

  const personsAfterFilter = filter === '' ? persons: persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) 

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name}?`)

    if(confirmDelete){
      personService
        .deletePersons(id)
        .then(returnedPerson => {
          persons.map(person => person.id !== id ? person: returnedPerson)
        })
        setPersons(persons.filter(person=> person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Search filter={filter} handleFilter={handleFilter} />
      <Form 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsAfterFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
