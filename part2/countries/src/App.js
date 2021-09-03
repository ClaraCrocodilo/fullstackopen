import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countries = ({ countries }) => {
    if (countries.length > 10) {
        return (
            <div>
            Too many matches, specify another filter
            </div>
        );
    } else if (countries.length === 0) {
        return <div></div>
    } else if (countries.length === 1) {
        const country = countries[0];
        return (
            <div>
                <h1>{country.name}</h1>
                capital {country.capital} <br />
                population {country.population} <br />
                <h2>languages</h2>
                <ul>
                    {country.languages.map(lang => (
                        <li key={lang.iso639_1}>
                            {lang.name}
                        </li>
                    ))}
                </ul>
                <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    width="160px"
                />
            </div>
        );
    } else {
        return (
            countries.map(country => (
                <div key={country.alpha3Code}>
                    {country.name}
                </div>
            ))
        );
    };
};

const App = () => {
    const [search, setSearch] = useState('');
    const [countries, setCountries] = useState([]);

    const handleSearchChange = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    };
    
    useEffect(() => {
        if (search.length === 0) return null
        axios.get(`https://restcountries.eu/rest/v2/name/${search}`)
            .then(response => {
                setCountries(response.data);
            })
            .catch(err => setCountries([]));
    }, [search]);

    return (
        <div>
            find countries <input
                value={search}
                onChange={handleSearchChange}
            />
            <Countries countries={countries}/>
        </div>
    );
};
export default App;
