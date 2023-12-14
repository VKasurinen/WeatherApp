import { useState, useEffect } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Home from "./components/Home";

const celsiusURL =
  "https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&current=temperature_2m,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=auto";
const fahrenheitURL =
  "https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&current=temperature_2m,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&temperature_unit=fahrenheit&timezone=auto";


function App() {
  //what need to be fixed:
  //The flexbox is not the best at the moment. Hourly chart goes below everything when resized and its not pretty also sidebar.jsx is not resizing properly.
  //currently only the date is shown below the hourly chart, I would like it to also show the hours and the date only once
  //There could be more tests atleast on Home.jsx

  const [selectedUnit, setSelectedUnit] = useState("metric");
  const [weatherData, setWeatherData] = useState(null);

  //Use effect for fetching data from the api also checking for celcius and fahrenheit.
  const fetchData = async () => {
    const url = selectedUnit === "metric" ? celsiusURL : fahrenheitURL; // Define the URLs outside of this component
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();  // Retrieve JSON data from the response
        setWeatherData(data);  // Set the fetched weather data to the 'weatherData' state
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Call the fetchData function when the component mounts or when selectedUnit or setSelectedUnit changes
  }, [selectedUnit]);




  const toggleUnit = () => {
    setSelectedUnit(selectedUnit === "metric" ? "imperial" : "metric");
  };

  

  return (
    <div className="mt-1 py-1 px-5 bg-neutral-100">
      <Header toggleUnit={toggleUnit} selectedUnit={selectedUnit} />
      <div className="flex flex-row flex-nowrap h-screen w-full lg:w-11/12">
        <SideBar selectedUnit={selectedUnit} weatherData={weatherData} />
        <Home selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit} weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;
