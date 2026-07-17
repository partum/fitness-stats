import { useState } from 'react'
import './App.css'
import Summary from './components/Summary'
import Filters from './components/Filters'
import Graphs from './components/Graphs'

function App() {
  const [xAxis, setXAxis] = useState("weight");
  const handleXAxisChange = (value) => {
    setXAxis(value);
  }

  return (
    <>
      <h1>Fitness Stats</h1>
      <Summary />
      <Filters default={xAxis} onChange={handleXAxisChange} />
      <Graphs selectedXAxis={xAxis} />
    </>
  )
}

export default App
