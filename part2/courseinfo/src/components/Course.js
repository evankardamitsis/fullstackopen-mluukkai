import React from 'react';

const Title = ({ title }) => <h2>{title}</h2>

const Content = ({ course }) => (
  <div>
    <ul>
      {course.map(({ name, exercises, id }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
    </ul>
  </div>
)

const Part = ({ name, exercises }) => <li>{name}: {exercises}</li>

const Total = ({ exercises }) => {
  const total = exercises.reduce((total_exercises, part) => total_exercises + part.exercises, 0)
  return (
    <p>
      <strong>There are {total} exercises in total</strong>
    </p>
  )
}

const Course = ({ course }) => (
  <div>
    <Title key={course.id} title={course.name} />
    <Content course={course.parts} />
    <Total exercises={course.parts} />
  </div>
)

export default Course;