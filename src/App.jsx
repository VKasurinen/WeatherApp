import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import SideBar from './components/SideBar'
import Home from './components/Home'
import Chart from './components/Chart'

function App() {

  //what need to be fixed:
  //If user rezises the screen the home.jsx component goes below sidebar.jsx component
  //need switch to upper right corner to switch celcius to fahrenheit

  const [selectedUnit, setSelectedUnit] = useState('metric'); // metric for Celsius and imperial for Fahrenheit

  const toggleUnit = () => {
    setSelectedUnit(selectedUnit === "metric" ? "imperial" : "metric");
  };


  return (
    <div className="mt-1 py-1 px-5 bg-neutral-100">
      <Header toggleUnit={toggleUnit} selectedUnit={selectedUnit} />
      <div className="flex h-screen w-screen">
        <SideBar selectedUnit={selectedUnit} />
        <Home selectedUnit={selectedUnit} />
      </div>
      
      {/* <Chart/> */}
    </div>
  )
}

export default App
