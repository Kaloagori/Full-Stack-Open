import { use, useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  
  return(
    <div>
      {props.text} {props.stat}
    </div>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const all = (good + neutral + bad)

  return(
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      <Statistics text="good" stat={good} />
      <Statistics text="neutral" stat={neutral} />
      <Statistics text="bad" stat={bad} />
      <Statistics text="all" stat={all} />
      <Statistics text="average" stat={(good - bad)/all} />
      <Statistics text="positive" stat={(good * 100)/all + " %"} />
    </div>
  )
} 

export default App
