import React from 'react'

const Part = (props) => (
    <p>{props.part.name} {props.part.exercices}</p>
);

const Header = (props) => (
    <h1>{props.course}</h1>
);

const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    );
};

const Total = (props) => {
    const total = props.course.parts.reduce((accumulator, currentValue) => {
        return { exercices: accumulator.exercices + currentValue.exercices }
    });
    return <p><b>total of {total.exercices} exercices</b></p>
};

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total course={course} />
        </div>
    )
};

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercices: 10,
                id: 1
            },
            {
                name: "Using props to pass data",
                exercices: 7,
                id: 2
            },
            {
                name: "State of a component",
                exercices: 14,
                id: 3
            },
            {
                name: "Redux",
                exercices: 11,
                id: 4
            }
        ]
    };

    return <Course course={course} />;
}

export default App;
