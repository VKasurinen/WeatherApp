import React from 'react'

const SideBar = () => {
  return (
    <div className="w-80 h-5/6 bg-slate-100 rounded-xl float-left shadow-md shadow-gray-400">
      <div className="max-w-screen-lg mx-auto flex-col items-center justify-center h-full px-4">
        {/* <div className="left-2 ml-20 text-xl font-semibold"> */}
        <div className='flex flex-col h-full mt-3'>
            <h1 className="text-lg font-semibold">Current weather</h1>

            <img src="/public/snow_light.png" alt="snow" className="mt-4 object-cover" />

            <h1 className="font-bold text-5xl">degree</h1>

            <h2 className="pt-4 font-semibold text-xl">Day, 16:31</h2>

            <p className="text-base font-normal mt-2">Snow</p>

            <hr className="text-gray-500 mt-5 text-lg bg-gray-500 h-1"/>

            <p className="text-base mt-5">Wind speed: </p>
        </div>
        

      </div>
      

        
      

    </div>
    
  )
}

export default SideBar