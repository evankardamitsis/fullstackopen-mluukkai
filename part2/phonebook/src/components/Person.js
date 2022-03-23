import React from 'react'

const Person = ({person, deletePerson}) => (
    <li>{person.name} {person.number} <br />
        <button onClick={() => deletePerson(person.id)}>Delete</button>
    </li>
)

export default Person;