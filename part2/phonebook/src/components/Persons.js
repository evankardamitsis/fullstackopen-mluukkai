import React from 'react'

import Person from './Person'

const Persons = ({persons, deletePerson }) => {
    return (
        <div>
            <ul>
                {persons.map(person =>
                    <Person key={person.name} person={person} deletePerson={deletePerson} />
                    )}
            </ul>
        </div>
    )
}

export default Persons;