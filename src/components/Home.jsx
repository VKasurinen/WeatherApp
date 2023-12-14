import React from "react";
import { useEffect, useState } from "react";
import Chart from "./Chart";
import { weatherCodes, getWeatherImage } from "../Utils/WeatherUtils";

/**
 *
 * @param {*} props for handling the selected unit and giving the information to Header.jsx
 * @returns  the html for the weekly highlight with temperature, date, picture, and weather code
 */

const Home = ({ selectedUnit, setSelectedUnit, weatherData }) => {

  /**
   * Here I check if the day is today. And it calculates the date for the upcoming days.
   *
   * @param {*} index
   * @returns day of the week with date
   */

  const getDayOfWeek = (index) => {
    //Get current date
    const today = new Date();
    // Get the date at the specified index from the weather data
    const targetDay = new Date(weatherData?.daily?.time[index]);

    if (index === 0) {
      return "Today";
    } else {
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      // Calculate the day index for the target day
      const dayIndex = (today.getDay() + index) % 7;
      // Create a date object from the target day
      const targetDate = new Date(targetDay);
      // Format the targetDate to get the day and month as "Mon, Dec" for example
      const formattedDate = targetDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
      // Return a string combining the day name and the formatted day
      return `${daysOfWeek[dayIndex]}, ${formattedDate}`;
    }
  };

  return (
    <div
      className="flex flex-row flex-wrap h-full lg:h-5/6 w-full lg:w-11/12 ml-10 bg-slate-100 rounded-xl shadow-md shadow-gray-400"
      data-testid="weekly-highlight"
    >
      <div className="left-2 ml-10 mt-3">
        <h1 className="text-xl font-semibold">Weekly highlight</h1>
      </div>
      {weatherData ? (
        <div className="flex flex-wrap flex-row items-center justify-center gap-10 mt-3 ml-11">
          {weatherData?.daily?.time.map((day, index) => (
            <div
              key={day}
              className="flex flex-col items-center justify-center border-2 border-slate-600 rounded-lg p-4 shadow-md shadow-gray-400"
              style={{ width: "150px" }}
            >
              <h1 className="font-semibold" data-testid={`day-${index}-name`}>
                {getDayOfWeek(index)}
              </h1>
              {/* bg-slate-400 */}
              <div className="bg-blue-300 rounded-lg">
                <img
                  src={getWeatherImage(weatherData?.daily?.weather_code[index])}
                  alt="weather"
                  className="mt-2"
                  data-testid={`day-${index}-weather-image`}
                />
              </div>

              <p className="text-md font-normal">
                {weatherCodes[weatherData?.daily?.weather_code[index]]}
              </p>
              <div className="flex flex-row justify-between">
                {selectedUnit === "metric" ? (
                  <>
                    <p className="mr-2 font-normal">
                      {weatherData?.daily?.temperature_2m_max[index]}°C
                    </p>
                    <p className="font-normal text-gray-500">
                      {weatherData?.daily?.temperature_2m_min[index]}°C
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mr-2 font-normal">
                      {weatherData?.daily?.temperature_2m_max[index]}°F
                    </p>
                    <p className="font-normal text-gray-500">
                      {weatherData?.daily?.temperature_2m_min[index]}°F
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <hr className="text-slate-400 mt-6 text-lg bg-gray-400 h-1" />

      <div
        className="flex-wrap items-center justify-center h-full lg:h-3/5 w-full lg:w-4/4"
        data-testid="chart"
      >
        <Chart selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit} weatherData={weatherData} />
      </div>
    </div>
  );
};

export default Home;
