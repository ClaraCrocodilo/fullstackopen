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
    const part1 = {
        name: "Fundamentals of React",
        exercices: 10
    };
    const part2 = {
        name: "Using props to pass data",
        exercices: 7
    };
    const part3 = {
        name: "State of a component",
        exercices: 14
    };

    return (
        <div>
            <Header course={course}/>
            <Content
                part1={part1.name}
                exercices1={part1.exercices}
                part2={part2.name}
                exercices2={part2.exercices}
                part3={part3.name}
                exercices3={part3.exercices}
            />
            <Total
                exercices1={part1.exercices}
                exercices2={part2.exercices}
                exercices3={part3.exercices}
            />
        </div>
    );
}

export default App;
