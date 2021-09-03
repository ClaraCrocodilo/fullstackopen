import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ weather }) => {
    return (
    weather.current != undefined &&
    <div>
        <h2>Weather in {weather.location.name}</h2>
        <b>temperature:</b> {weather.current.temperature} Celsius <br/>
        <img
            src={weather.current.weather_icons[0]}
            alt={`${weather.current.weather_descriptions[0]} weather`}
            width="80px"
        /><br/>
        <b>wind:</b> {`${weather.current.wind_speed} mph direction ${weather.current.wind_dir}`}
    </div>
);
}

const Country = ({ country }) => (
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

const Countries = ({ countries, weather, shownCountries, setShownCountries,
    handleShownCountriesChange }) => {


    if (countries.length > 10) {
        return (
            <div>
            Too many matches, specify another filter
            </div>
        );
    } else if (countries.length === 0) {
        return <div></div>
    } else if (countries.length === 1) {
        return (
            <div>
            <Country country={countries[0]}/>
            <Weather country={countries[0]} weather={weather}/>
            </div>
        );
    } else {
        return (
            countries.map(country => (
                <div key={country.alpha3Code}>
                    {country.name}
                    <button onClick={handleShownCountriesChange(country)}>
                        {(shownCountries[country.name]) ? "hide" : "show"}
                    </button>
                    {shownCountries[country.name] && <Country country={country}/>}
                </div>
            ))
        );
    };
};

const App = () => {
    const [search, setSearch] = useState('');
    const [countries, setCountries] = useState([]);
    const [shownCountries, setShownCountries] = useState({});
    const [weather, setWeather] = useState({});

    const handleSearchChange = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    };
    const handleShownCountriesChange = country => () => {
        setShownCountries({...shownCountries,
            [country.name]: !shownCountries[country.name]
        });
    };
    
    useEffect(() => {
        if (search.length === 0) return null
        axios.get(`https://restcountries.eu/rest/v2/name/${search}`)
            .then(response => {
                setCountries(response.data);
                setShownCountries(Object.fromEntries(response.data.map(country => {
                    return [country.name, false]
                })));
            })
            .catch(err => setCountries([]));
    }, [search]);

    useEffect(() => {
        if (countries.length != 1) return null
        axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${countries[0].name}`)
            .then(response => {
                setWeather(response.data)
            });
    }, [countries]);

    return (
        <div>
            find countries <input
                value={search}
                onChange={handleSearchChange}
            />
            <Countries 
                countries={countries}
                weather={weather}
                shownCountries={shownCountries}
                setShownCountries={setShownCountries}
                handleShownCountriesChange={handleShownCountriesChange}
            />
        </div>
    );
};
export default App;
