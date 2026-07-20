import { useState } from 'react'
import './App.css'
import Summary from './components/Summary'
import Filters from './components/Filters'
import Graphs from './components/Graphs'

function App() {
  const [xAxis, setXAxis] = useState("Fat_Percentage");
  const [yAxis, setYAxis] = useState("Calories_Burned");
  const handleXAxisChange = (value) => {
    setXAxis(value);
  }
  const handleYAxisChange = (value) => {
    setYAxis(value);
  }

  return (
    <>
      <h1>Fitness Stats</h1>
      <Summary />
      <Filters defaultX={xAxis} defaultY={yAxis} onChangeX={handleXAxisChange} onChangeY={handleYAxisChange} />
      <Graphs selectedXAxis={xAxis} selectedYAxis={yAxis} />
    </>
  )
}

export default App
