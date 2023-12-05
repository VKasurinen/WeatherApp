import React from "react";
import { useEffect, useState } from "react";

const celsiusURL =
  "https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&current=temperature_2m,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=auto";
const fahrenheitURL =
  "https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&current=temperature_2m,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&temperature_unit=fahrenheit&timezone=auto";

// Weather codes for the weekly highlight. I didn't find from the api this directly. Like this: weather code 0 -> "Clear sky"
  const weatherCodes = {
    0: "Clear sky", //sun.png
    1: "Mainly clear", //few_clouds.png
    2: "Partly cloudy", //brokenclouds.png
    3: "Overcast", //scatteredclouds.png
    45: "Fog", //mist.png
    48: "Depositing rime fog", //mist.png
    51: "Drizzle",
    53: "Drizzle", //showerRain.png
    55: "Drizzle",
    56: "Freezing drizzle", //showerRain.png
    57: "Freezing drizzle",
    61: "Rain",
    63: "Rain", //rain.png
    65: "Rain",
    66: "Freezing rain",
    67: "Freezing rain",
    71: "Snowfall",
    73: "Snowfall", //snow.png
    75: "Snowfall",
    77: "Snow grains",
    80: "Rain showers", //showerRain.png
    81: "Rain showers",
    82: "Rain showers",
    85: "Snow showers", //snow.png
    86: "Snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm", //thunder.png
    99: "Thunderstorm",
  };


//Switch case for the weather images
const getWeatherImage = (weatherCode) => {
  switch (weatherCode) {
    case 0:
      return "/Images/sun.png";
    case 1:
      return "/Images/few_clouds.png";
    case 2:
      return "/Images/brokenclouds.png";
    case 3:
      return "/Images/scatteredclouds.png";
    case 45:
    case 48:
      return "/Images/mist.png";
    case 51:
    case 53:
    case 55:
      return "/Images/showerRain.png";
    case 56:
    case 57:
      return "/Images/showerRain.png";
    case 61:
    case 63:
    case 65:
      return "/Images/rain.png";
    case 66:
    case 67:
      return "/Images/showerRain.png";
    case 71:
    case 73:
    case 75:
    case 77:
      return "/Images/snow.png";
    case 80:
    case 81:
    case 82:
      return "/Images/showerRain.png";
    case 85:
    case 86:
      return "/Images/snow.png";
    case 95:
    case 96:
    case 99:
      return "/Images/thunder.png";
    default:
      return "/Images/few_clouds.png";
  }
};

/**
 *
 * @param {*} param0
 * @returns Sidebar for current weather where is date, weather, temperature and wind speed
 */

const SideBar = ({ selectedUnit }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  //Use effect for fetching data from the api also checking for celcius and fahrenheit.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch( // Fetch data based on the selected unit (metric or imperial)
          selectedUnit === "metric" ? celsiusURL : fahrenheitURL
        );

        if (response.ok) {
          const data = await response.json(); // Retrieve JSON data from the response
          setWeatherData(data); // Set the fetched weather data to the 'weatherData' state
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts or when selectedUnit or setSelectedUnit changes
  }, [selectedUnit]);

  //Use effect for updating current time state.
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = `${now.getHours()}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //Const for temperature, weather code, wind speed. This way we can assure that the values are not empty.
  const temperature = weatherData?.current?.temperature_2m ?? "";
  const weatherCode = weatherData?.current?.weather_code ?? "";
  const windSpeed = weatherData?.current?.wind_speed_10m ?? "";

  const today = new Date();  //creates Date object
  const options = { weekday: "long" }; //full weekday
  const day = today.toLocaleDateString("en-US", options); //converts day to string

  const weatherDescription = weatherCodes[weatherCode] || "Unknown";  //gets weather code

  return (
    <div
      className="h-full lg:h-5/6 w-full lg:w-1/5 bg-slate-100 rounded-xl shadow-md shadow-gray-400"
      data-testid="sidebar"
    >
      <div className="max-w-screen-lg mx-auto flex-col items-center justify-center h-full px-4">
        <div className="flex flex-col h-full mt-3">
          <h1 className="text-xl font-semibold">Current weather</h1>
          <div className="bg-blue-300 rounded-xl m-5 mt-5">
            <img
              style={{ width: "250px", height: "225px" }}
              src={getWeatherImage(weatherCode)}
              alt="weather"
              className="mt-2"
              data-testid="weather-image"
            />
          </div>

          {selectedUnit === "metric" ? (
            <>
              <h1 className="font-bold text-5xl mt-4" data-testid="temperature">
                {temperature}°C
              </h1>
            </>
          ) : (
            <>
              <h1 className="font-bold text-5xl mt-4" data-testid="temperature">
                {temperature}°F
              </h1>
            </>
          )}

          <h2
            className="mt-4 font-semibold text-xl"
            data-testid="current-day-time"
          >
            {day}, {currentTime}
          </h2>

          <p
            className="text-base font-normal mt-2 mb-3"
            data-testid="weather-description"
          >
            {weatherDescription}
          </p>

          <hr className="text-slate-400 mt-5 text-lg bg-gray-400 h-1" />

          <div
            className="flex flex-row justify-start items-center mt-3"
            data-testid="wind-speed"
          >
            <img
              src="/windy.png"
              alt="snow"
              className="mt-4 mr-2"
              style={{ width: "45px", height: "45px" }}
            />
            <p className="text-base mt-5">Wind speed: {windSpeed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
