import React from 'react'

const Part = (props) => (
    <p>{props.part} {props.exercices}</p>
);

const Header = (props) => (
    <h1>{props.course}</h1>
);

const Content = (props) => (
    <>
        <Part part={props.part1} exercices={props.exercices1}/>
        <Part part={props.part2} exercices={props.exercices2}/>
        <Part part={props.part3} exercices={props.exercices3}/>
    </>
);

const Total = (props) => (
    <p>Number of exercices {props.exercices1 + props.exercices2 + props.exercices3}</p>
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
            <Content
                part1={parts[0].name}
                exercices1={parts[0].exercices}
                part2={parts[1].name}
                exercices2={parts[1].exercices}
                part3={parts[2].name}
                exercices3={parts[2].exercices}
            />
            <Total
                exercices1={parts[0].exercices}
                exercices2={parts[1].exercices}
                exercices3={parts[2].exercices}
            />
        </div>
    );
}

export default App;
