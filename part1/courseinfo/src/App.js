const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>{props.name} {props.number}</p>
  )
}

const Content = (props) => {
  console.log(props)
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Part name={part1} number={exercises1} />
      <Part name={part2} number={exercises2} />
      <Part name={part3} number={exercises3} />
    </div>
  )
}

const Total = () => {
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14
  return (
    <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App