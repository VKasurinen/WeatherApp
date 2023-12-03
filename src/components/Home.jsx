import React from 'react'
import { useEffect, useState } from 'react';

const URL = "https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&current=temperature_2m,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=auto";


const Home = () => {

  const [weatherData, setWeatherData] = useState(null);

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


  return (
    
      <div className="h-5/6 w-3/4 bg-slate-100 rounded-xl float-right shadow-md shadow-gray-400">

          <div className="left-2 ml-10 mt-3">
              <h1 className='text-xl font-semibold'>Weekly highlight</h1>
          </div>

          <div className="flex flex-row items-center justify-center gap-10 mt-10 ml-20">

            <div className="flex flex-col items-center justify-center border-2 border-blue-500 rounded-lg p-2 shadow-md shadow-gray-400">
              <h1>Today</h1>
              
              <img src="/public/snow_light.png" alt="snow" className="mt-2" />
              <p className="text-md font-normal">Light snow</p>

              <div className="flex flex-row justify-between">
                <p className="mr-3 font-normal">-23</p>
                <p className="font-normal">-26</p>
              </div>
              
            </div>

            <div className="flex flex-col items-center justify-center border-2 border-blue-500 rounded-lg p-2 shadow-md shadow-gray-400">
              <h1>Today</h1>
              
              <img src="/public/snow_light.png" alt="snow" className="mt-2" />
              <p className="text-md font-normal">Light snow</p>

              <div className="flex flex-row justify-between">
                <p className="mr-3 font-normal">-23</p>
                <p className="font-normal">-26</p>
              </div>
              
            </div>

            <div className="flex flex-col items-center justify-center border-2 border-blue-500 rounded-lg p-2 shadow-md shadow-gray-400">
              <h1>Today</h1>
              
              <img src="/public/snow_light.png" alt="snow" className="mt-2" />
              <p className="text-md font-normal">Light snow</p>

              <div className="flex flex-row justify-between">
                <p className="mr-3 font-normal">-23</p>
                <p className="font-normal">-26</p>
              </div>
              
            </div>

            <div className="flex flex-col items-center justify-center border-2 border-blue-500 rounded-lg p-2 shadow-md shadow-gray-400">
              <h1>Today</h1>
              
              <img src="/public/snow_light.png" alt="snow" className="mt-2" />
              <p className="text-md font-normal">Light snow</p>

              <div className="flex flex-row justify-between">
                <p className="mr-3 font-normal">-23</p>
                <p className="font-normal">-26</p>
              </div>
              
            </div>

            <div className="flex flex-col items-center justify-center border-2 border-blue-500 rounded-lg p-2 shadow-md shadow-gray-400">
              <h1>Today</h1>
              
              <img src="/public/snow_light.png" alt="snow" className="mt-2" />
              <p className="text-md font-normal">Light snow</p>

              <div className="flex flex-row justify-between">
                <p className="mr-3 font-normal">-23</p>
                <p className="font-normal">-26</p>
              </div>
              
            </div>

            <div className="flex flex-col items-center justify-center border-2 border-blue-500 rounded-lg p-2 shadow-md shadow-gray-400">
              <h1>Today</h1>
              
              <img src="/public/snow_light.png" alt="snow" className="mt-2" />
              <p className="text-md font-normal">Light snow</p>

              <div className="flex flex-row justify-between">
                <p className="mr-3 font-normal">-23</p>
                <p className="font-normal">-26</p>
              </div>
              
            </div>

            <div className="flex flex-col items-center justify-center border-2 border-blue-500 rounded-lg p-2 shadow-md shadow-gray-400">
              <h1>Today</h1>
              
              <img src="/public/snow_light.png" alt="snow" className="mt-2" />
              <p className="text-md font-normal">Light snow</p>

              <div className="flex flex-row justify-between">
                <p className="mr-3 font-normal">-23</p>
                <p className="font-normal">-26</p>
              </div>
              
            </div>
            

            

            
            
          </div>

          <hr className="my-5"/>

      </div>
    
  )
}

export default Home