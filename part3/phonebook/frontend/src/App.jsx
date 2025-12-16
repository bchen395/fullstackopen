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
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    let trueNewName = true
    persons.forEach((person) => {
      if (person.name === newName) {
        if (window.confirm(`${newName} is already added to phonebook, replace old number?`)){
          personService
          .update(person.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name === personObject.name ? 
            returnedPerson : person))
          })
          .catch(error => {
            setMessage(
              `Information of ${person.name} has already been removed from server`
            )
              setTimeout(() => {
                setMessage(null)
            }, 5000)
            setPersons(persons.filter((n) => n.name !== personObject.name))
          })
         setMessage(
          `Changed ${personObject.name}'s number to ${personObject.number}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
        trueNewName = false
        }
      }
    })

    if (trueNewName===true){
      personService
        .create(personObject)
        .then(returnedPerson => { 
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${personObject.name}`)
          setTimeout(() => {
          setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(error.response.data.error)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

  
      }
    
    setNewName('')
    setNewNumber('')
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    if (newFilter==='') {
      setShowAll(true)
    }
    else {
      setShowAll(false)
    }
  }


  const peopleToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()) )

  const deletePerson = id => {
    personService
      .remove(id)
      .then(setPersons(persons.filter(n => n.id !== id)))
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons people={peopleToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App