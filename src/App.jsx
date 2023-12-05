import { useState } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Home from "./components/Home";

function App() {
  //what need to be fixed:
  //The flexbox is not the best at the moment. Hourly chart goes below everything and its not pretty.
  //currently only the date is shown below the hour chart, I would like it to also show the hours and the date only once
  //There could be more tests atleast on Home.jsx

  const [selectedUnit, setSelectedUnit] = useState("metric");

  const toggleUnit = () => {
    setSelectedUnit(selectedUnit === "metric" ? "imperial" : "metric");
  };

  return (
    <div className="mt-1 py-1 px-5 bg-neutral-100">
      <Header toggleUnit={toggleUnit} selectedUnit={selectedUnit} />

      <div className="flex flex-row flex-nowrap h-screen w-full lg:w-11/12">
        <SideBar selectedUnit={selectedUnit} />
        <Home selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit} />
      </div>
    </div>
  );
}

export default App;
