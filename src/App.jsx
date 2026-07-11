import { useState } from 'react'
import './App.css'
import Summary from './components/Summary'
import Filters from './components/Filters'
import Graphs from './components/Graphs'

function App() {

  return (
    <>
      <h1>Fitness Stats</h1>
      <Summary />
      <Filters />
      <Graphs /> 
    </>
  )
}

export default App
