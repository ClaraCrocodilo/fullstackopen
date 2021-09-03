import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ filter, handleFilterChange }) => (
    <form>
        <div>
            filter shown with <input
                value={filter}
                onChange={handleFilterChange}
            />
        </div>
    </form>
);

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => (
    <form onSubmit={addPerson}>
        <div>
            name: <input
                value={newName}
                onChange={handleNameChange}
            />
        </div>
        <div>
            number: <input
                value={newNumber}
                onChange={handleNumberChange}
            />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
);

const Persons = ({ persons, filter }) => (
    <>
    {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </>
);

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const hook = () => {
        axios.get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            });
    };
    useEffect(hook, []);

    const addPerson = (event) => {
        event.preventDefault();
        if (persons.map(person => person.name).includes(newName)) {
            window.alert(`${newName} is already added to phonebook`);
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            };
            setPersons(persons.concat(newPerson));
        };
    };

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter filter={filter} handleFilterChange={handleFilterChange}/>

            <h3>add a new</h3>
            
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />

            <h3>Numbers</h3>

            <Persons persons={persons} filter={filter}/>
        </div>
    )
};

export default App;
