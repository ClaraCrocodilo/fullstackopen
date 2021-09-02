import React from 'react';

const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
);

const Header = (props) => (
    <h2>{props.course}</h2>
);

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    );
};

const Total = (props) => {
    const total = props.course.parts.reduce((accumulator, currentValue) => {
        return { exercises: accumulator.exercises + currentValue.exercises }
    });
    return <p><b>total of {total.exercises} exercises</b></p>
};

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map((course) => (
                <div key={course.id}>
                <Header course={course.name}/>
                <Content parts={course.parts}/>
                <Total course={course} />
                </div>
            ))}
        </div>
    )
};

export default Course
