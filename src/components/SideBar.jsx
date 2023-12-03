import { data } from 'autoprefixer';
import React from 'react'
import { useEffect, useState } from 'react';

//const URL = "https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&current=temperature_2m,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto";

const URL = "https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&current=temperature_2m,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=auto";

const getWeatherDescription = (code) => {
  const weatherCodes = {
    0: "Clear sky",
    "1, 2, 3": "Mainly clear, partly cloudy, and overcast",
    "45, 48": "Fog and depositing rime fog",
    "51, 53, 55": "Drizzle: Light, moderate, and dense intensity",
    "56, 57": "Freezing Drizzle: Light and dense intensity",
    "61, 63, 65": "Rain: Slight, moderate and heavy intensity",
    "66, 67": "Freezing Rain: Light and heavy intensity",
    "71, 73, 75": "Snow fall: Slight, moderate, and heavy intensity",
    77: "Snow grains",
    "80, 81, 82": "Rain showers: Slight, moderate, and violent",
    "85, 86": "Snow showers slight and heavy",
    "95": "Thunderstorm: Slight or moderate",
    "96, 99": "Thunderstorm with slight and heavy hail",
  };

  for (const key in weatherCodes) {
    if (key.includes(code)) {
      return weatherCodes[key];
    }
  }

  return "Unknown";
};



const SideBar = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);

        // response.json().then(json => {
        //   console.log(json)
        // })

        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const temperature = weatherData?.current?.temperature_2m ?? '';
  const weatherCode = weatherData?.current?.weather_code ?? '';
  const windSpeed = weatherData?.current?.wind_speed_10m ?? '';

  const today = new Date();
  const options = { weekday: 'long' };
  const day = today.toLocaleDateString('en-US', options);

  const weatherDescription = getWeatherDescription(weatherCode);


  return (
    <div className="w-80 h-5/6 bg-slate-100 rounded-xl float-left shadow-md shadow-gray-400">
      <div className="max-w-screen-lg mx-auto flex-col items-center justify-center h-full px-4">
        {/* <div className="left-2 ml-20 text-xl font-semibold"> */}
        <div className='flex flex-col h-full mt-3'>
            <h1 className="text-lg font-semibold">Current weather</h1>

            <img src="/public/snow_light.png" alt="snow" className="mt-4 object-cover" />

            <h1 className="font-bold text-5xl">{temperature}</h1>

            <h2 className="pt-4 font-semibold text-xl">{day}, {currentTime}</h2>

            <p className="text-base font-normal mt-2">Snow {weatherDescription}</p>

            <hr className="text-gray-500 mt-5 text-lg bg-gray-500 h-1"/>

            

            <p className="text-base mt-5">Wind speed: {windSpeed} m/s</p>
        </div>
        

      </div>
      

    </div>
    
  )
}

export default SideBar