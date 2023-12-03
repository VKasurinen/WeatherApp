import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';

const Header = ({ toggleUnit }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleToggle = () => {
    toggleUnit();
  };

  return (
    <div className="flex justify-between items-center w-full h-20 px-4">
      <div className="flex flex-row items-center">
        <img src="/public/cloud.png" alt="sun" className="object-cover mr-1" />
        <h1 className="text-3xl font-bold ml-2">Weather</h1>
      </div>

      <div
        className="flex justify-end items-center"
        onClick={() => setIsSelected(!isSelected)}
      >
        <div
          className={classNames(
            'flex w-20 h-11 m-2 rounded-full transition-all duration-500 border-2 border-gray-400',
            {
              'bg-red-200': isSelected,
              'bg-blue-200': !isSelected,
            }
          )}
          onClick={toggleUnit}
        >
          <span
            className={classNames(
              'h-10 w-10 bg-white rounded-full flex items-center justify-center text-lg font-semibold text-white transition-all duration-500 shadow-xl',
              {
                'ml-10': isSelected,
                'bg-blue-500': !isSelected,
                'bg-red-600': isSelected,
              }
            )}
          >
            {isSelected ? '°F' : '°C'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;



