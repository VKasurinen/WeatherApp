import React from 'react';
import { useEffect, useState } from 'react';
import Chart from './Chart';


const celsiusURL = "https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&current=temperature_2m,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=auto";

const fahrenheitURL = "https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&current=temperature_2m,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&temperature_unit=fahrenheit&timezone=auto";

// Weather codes for the weekly highlight. I didn't find from the api this directly. Like code 0 -> "Clear sky"
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

//Switch case for the weather images
const getWeatherImage = (weatherCode) => {
  switch (weatherCode) {
    case 0:
      return '/Images/sun.png';
    case 1:
      return '/Images/few_clouds.png';
    case 2:
      return '/Images/brokenclouds.png';
    case 3:
      return '/Images/scatteredclouds.png';
    case 45:
    case 48:
      return '/Images/mist.png';
    case 51:
    case 53:
    case 55:
      return '/Images/showerRain.png';
    case 56:
    case 57:
      return '/Images/showerRain.png';
    case 61:
    case 63:
    case 65:
      return '/Images/rain.png';
    case 66:
    case 67:
      return '/Images/showerRain.png';
    case 71:
    case 73:
    case 75:
    case 77:
      return '/Images/snow.png';
    case 80:
    case 81:
    case 82:
      return '/Images/showerRain.png';
    case 85:
    case 86:
      return '/Images/snow.png';
    case 95:
    case 96:
    case 99:
      return '/Images/thunder.png';
    default:
      return '/Images/few_clouds.png';
  }
};

/**
 * 
 * @param {*} props for handling the selected unit and giving the information to Header.jsx
 * @returns  the html for the weekly highlight with temperature, date, picture, and weather code
 */

const Home = (props) => {
  //Use states for the weatherdata and for Celsius and fahrenheit
  const [weatherData, setWeatherData] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(props.selectedUnit);

  useEffect(() => {
    setSelectedUnit(props.selectedUnit);
  }, [props.selectedUnit]);

  // const for the selected url
  const selectedURL = props.selectedUnit === 'metric' ? celsiusURL : fahrenheitURL;

  //Use effect for fetching the data from the API
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(selectedURL);

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
  }, [selectedURL]);

  
  /**
   * const for the date
   * 
   * @param {*} index 
   * @returns day of the week with date
   */

  const getDayOfWeek = (index) => {
    const today = new Date();
    const targetDay = new Date(weatherData?.daily?.time[index]);

    if (index === 0) {
      return 'Today';
    } else {
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayIndex = (today.getDay() + index) % 7;
      const targetDate = new Date(targetDay);
      const formattedDate = targetDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
      return `${daysOfWeek[dayIndex]}, ${formattedDate}`;
    }
  };


  return (
    <div className="h-full lg:h-5/6 w-full lg:w-11/12 bg-slate-100 rounded-xl float-right shadow-md shadow-gray-400">
      <div className="left-2 ml-10 mt-3">
        <h1 className='text-xl font-semibold'>Weekly highlight</h1>
      </div>
      {weatherData ? (
        <div className="flex flex-wrap flex-row items-center justify-center gap-10 mt-5 ml-5">
          {weatherData?.daily?.time.map((day, index) => (
            <div
              key={day}
              className="flex flex-col items-center justify-center border-2 border-blue-500 rounded-lg p-4 shadow-md shadow-gray-400"
              style={{width: "150px"}}
            >
              <h1 className="font-semibold">{getDayOfWeek(index)}</h1>

              <div className="bg-slate-300 rounded-lg">
                <img
                  src={getWeatherImage(weatherData?.daily?.weather_code[index])}
                  alt="weather"
                  className="mt-2"
                />
              </div>

              <p className="text-md font-normal">{weatherCodes[weatherData?.daily?.weather_code[index]]}</p>
              <div className="flex flex-row justify-between">
                {selectedUnit === 'metric' ? (
                  <>
                    <p className="mr-2 font-normal">{weatherData?.daily?.temperature_2m_max[index]}°C</p>
                    <p className="font-normal text-gray-400">{weatherData?.daily?.temperature_2m_min[index]}°C</p>
                  </>
                ) : (
                  <>
                    <p className="mr-2 font-normal">{weatherData?.daily?.temperature_2m_max[index]}°F</p>
                    <p className="font-normal text-gray-400">{weatherData?.daily?.temperature_2m_min[index]}°F</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <hr className="text-slate-400 mt-6 text-lg bg-gray-400 h-1"/>

      <div className="flex-wrap items-center justify-center h-full lg:h-3/5 w-full lg:w-4/4">
        <Chart selectedUnit={selectedUnit}/>
      </div>

    </div>
  );
};

export default Home;
