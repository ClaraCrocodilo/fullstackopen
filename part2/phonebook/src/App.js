import React, { useState, useEffect } from 'react';
import numberService from './services/numbers';

const Notification = ({ message, isError }) => {
    if (message === null) {
        return null;
    };

    return (
        <div className={isError ? "error" : "notification"}>
            {message}
        </div>
    )
};

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

const Persons = ({ persons, filter, deleteNumber }) => (
    <>
        {persons.filter(person => person.name.toLowerCase()
            .includes(filter.toLowerCase()))
                .map(person => {
                    return (
                        <div key={person.name}>
                            {person.name} {person.number}
                            <button onClick={deleteNumber(person)}>
                                delete
                            </button>
                        </div>
                    );
                })
        }
    </>
);

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [notificationError, setNotificationError] = useState(false);

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
        numberService
            .getAll()
            .then(initialNumbers => setPersons(initialNumbers))
    };
    useEffect(hook, []);

    const addPerson = (event) => {
        event.preventDefault();
        if (persons.map(person => person.name).includes(newName)) {
            if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                const updatedPerson = persons.filter(p => p.name === newName)[0];
                updatedPerson.number = newNumber;
                const id = updatedPerson.id;
                numberService
                    .update(id, updatedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id != id ? p : returnedPerson))
                        setNotificationError(false);
                        setNotificationMessage(`Updated ${returnedPerson.name}`);
                        setTimeout(() => {
                            setNotificationMessage(null);
                        }, 5000);
                    })
                    .catch(error => {
                        setNotificationError(true);
                        setNotificationMessage(`Information of ${updatedPerson.name} has already been removed from server`);
                        setTimeout(() => {
                            setNotificationMessage(null);
                        }, 5000);
                        setPersons(persons.filter(p => p.id !== id));
                    });
            };
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            };
            numberService
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson));
                    setNotificationError(false);
                    setNotificationMessage(`Added ${returnedPerson.name}`)
                    setTimeout(() => {
                        setNotificationMessage(null);
                    }, 5000);
                });
        };
};

    const deleteNumber = (person) => () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            numberService.deleteNumber(person.id)
                .then(returnedData => {
                    setPersons(persons.filter(p => p.id !== person.id))
                });
        };
};

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={notificationMessage} isError={notificationError} />

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

            <Persons persons={persons} filter={filter} deleteNumber={deleteNumber}/>
        </div>
    )
};

export default App;
