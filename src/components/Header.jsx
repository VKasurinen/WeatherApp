import React from 'react'

const Header = () => {
  return (
    <div className="flex justify-between items-center w-full h-20 px-4 mb-1">
        <div className="flex flex-row items-center">
            <img src="/public/cloud.png" alt="sun" className="object-cover mr-1" />
            <h1 className="text-3xl font-bold ml-2">Weather</h1>
        </div>


        {/* Tänne switch */}

    </div>


  )
}

export default Header