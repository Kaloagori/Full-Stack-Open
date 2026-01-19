const Course = ({course}) => {

  const total = course.parts.reduce((sum, total) => sum + total.exercises, 0)

  return(
    <div>
      <h1>{course.map(name => {name.name})}</h1>
        { /*
        {course.parts.map(part => 
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )} */}
        <b>total of {total} exercises </b>
    </div>
  )
}

const App = () => {

  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middleware',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course course={course} />
}

export default App