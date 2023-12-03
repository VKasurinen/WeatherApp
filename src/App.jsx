import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import SideBar from './components/SideBar'
import Home from './components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen w-full mx-auto mt-1 py-1 px-5 bg-neutral-100">
      <Header/>
      <SideBar/>
      <Home/>
      {/* <Chart/> */}
    </div>
  )
}

export default App
