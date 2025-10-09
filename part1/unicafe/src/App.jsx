import { useState } from 'react'

const Statistics = ({total, score, good, neutral, bad}) => {
  if (total === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={total} />
          <StatisticLine text="average" value ={score/total} />
          <StatisticLine text="positive" value ={(good/total)*100} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text} {props.value}</td>
    </tr>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good+1
    const updatedScore = score+1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
    setScore(updatedScore)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)

  } 
  
  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedScore = score-1
    setBad(updatedBad)
    setTotal(good+neutral+updatedBad)
    setScore(updatedScore)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />

      <h1>statistics</h1>
      <Statistics total={total} score={score} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App