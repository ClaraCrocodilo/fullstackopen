import React, { useState } from 'react';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
);

const Statistics = ({ good, neutral, bad }) => {
    const average = (good, neutral, bad) => {
        if (good + neutral + bad != 0) return (good - bad)/(good + neutral + bad);
        return "";
    };

    const percentage = (good, neutral, bad) => {
        if (good + neutral + bad != 0) return `${(good/(good + neutral + bad)) * 100} %`;
        return "";
    };

    return (
        <div>
            <h1>statistics</h1>
            good {good} <br />
            neutral {neutral} <br />
            bad {bad} <br />
            all {good + neutral + bad} <br />
            average {average(good, neutral, bad)}<br />
            positive {percentage(good, neutral, bad)}
        </div>
    );
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGoodClick = () => setGood(good + 1);
    const handleNeutralClick = () => setNeutral(neutral + 1);
    const handleBadClick = () => setBad(bad + 1);


    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={handleGoodClick} text="good" />
            <Button handleClick={handleNeutralClick} text="neutral" />
            <Button handleClick={handleBadClick} text="bad" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
};

export default App;
