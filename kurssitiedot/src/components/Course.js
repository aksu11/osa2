import React from 'react'

const Total = ({parts}) => {
  const arr = parts.map(part => part.exercises)
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const sum = arr.reduce(reducer)
  return ( <b>total of {sum} exercises</b> )
}

const Course = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map(part => <div key={part.id}>{part.name} {part.exercises}</div>) }
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course