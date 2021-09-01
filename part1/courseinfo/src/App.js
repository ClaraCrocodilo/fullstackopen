import React from 'react'

const Part = (props) => (
    <p>{props.part.name} {props.part.exercices}</p>
);

const Header = (props) => (
    <h1>{props.course}</h1>
);

const Content = (props) => (
    <>
        <Part part={props.parts[0]}/>
        <Part part={props.parts[1]}/>
        <Part part={props.parts[2]}/>
    </>
);

const Total = (props) => (
    <p>Number of exercices {props.parts[0].exercices + props.parts[1].exercices + props.parts[2].exercices}</p> 
);

const App = () => {
    const course = "Half Stack application development";
    const parts = [
    {
        name: "Fundamentals of React",
        exercices: 10
    },
    {
        name: "Using props to pass data",
        exercices: 7
    },
    {
        name: "State of a component",
        exercices: 14
    }
    ];

    return (
        <div>
            <Header course={course}/>
            <Content parts={parts}/>
            <Total parts={parts}/>
        </div>
    );
}

export default App;
