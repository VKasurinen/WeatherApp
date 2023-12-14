import React from "react";
import { useEffect, useState } from "react";
import { weatherCodes, getWeatherImage } from "../Utils/WeatherUtils";

/**
 *
 * @param {*} param0
 * @returns Sidebar for current weather where is date, weather, temperature and wind speed
 */

const SideBar = ({ selectedUnit, weatherData}) => {
  const [currentTime, setCurrentTime] = useState("");
  
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
              src="Images/windy.png"
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
