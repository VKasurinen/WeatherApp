import { data } from 'autoprefixer';
import React from 'react'
import { useEffect, useState } from 'react';

//const URL = "https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&current=temperature_2m,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto";

const URL = "https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&current=temperature_2m,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=auto";

const getWeatherDescription = (code) => {
  const weatherCodes = {
    0: 'Clear sky',             //sun.png
    1: 'Mainly clear',          //few_clouds.png
    2: 'Partly cloudy',         //brokenclouds.png
    3: 'Overcast',              //scatteredclouds.png
    45: 'Fog',                  //mist.png
    48: 'Depositing rime fog',  //mist.png
    51: 'Drizzle',
    53: 'Drizzle',              //showerRain.png
    55: 'Drizzle',
    56: 'Freezing drizzle',     //showerRain.png
    57: 'Freezing drizzle',
    61: 'Rain',
    63: 'Rain',                 //rain.png
    65: 'Rain',
    66: 'Freezing rain',
    67: 'Freezing rain',
    71: 'Snowfall',
    73: 'Snowfall',             //snow.png
    75: 'Snowfall',
    77: 'Snow grains',
    80: 'Rain showers',         //showerRain.png
    81: 'Rain showers',
    82: 'Rain showers',
    85: 'Snow showers',         //snow.png
    86: 'Snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm',         //thunder.png
    99: 'Thunderstorm',
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

            <p className="text-base font-normal mt-2">{weatherDescription}</p>

            <hr className="text-gray-500 mt-5 text-lg bg-gray-500 h-1"/>

            <div className="flex flex-row justify-start items-center">
              <img src="/public/windy.png" alt="snow" className="mt-4 mr-2" style={{width: "35px", height: "35px"}} />
              <p className="text-base mt-5">Wind speed: {windSpeed} m/s</p>
            </div>
            
        </div>
        

      </div>
      

    </div>
    
  )
}

export default SideBar