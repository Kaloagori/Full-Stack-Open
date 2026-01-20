const Course = ({course}) => {
  
  return(
    <div>
      {course.map(name => 
        <div key={name.id}>

          <h1>Web development curriculum</h1>

          <h2>{name.name}</h2>

          {name.parts.map(part => 
            <p key={part.id}>
              {part.name} {part.exercises}
            </p>
          )}
          
          <b>total of {name.parts.reduce((sum, total) => sum + total.exercises, 0)} exercises</b>
        </div>
      )}  
    </div>
  )
}


export default Course