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
      <h1>Fitness Metrics</h1>
      <p>Fitness data exploration with filterable scatter plot</p>
      <Summary />
      <div className="grid">
        <Filters defaultX={xAxis} defaultY={yAxis} onChangeX={handleXAxisChange} onChangeY={handleYAxisChange} />
        <Graphs selectedXAxis={xAxis} selectedYAxis={yAxis} />
      </div>
    </>
  )
}

export default App
