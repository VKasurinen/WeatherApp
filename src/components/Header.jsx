import React from "react";
import { useState } from "react";
import classNames from "classnames";

/**
 *
 * @param {*} param0
 * @returns header where is switch for celcius and fahrenheit
 */

const Header = ({ toggleUnit }) => {
  //Use state for switch
  const [isSelected, setIsSelected] = useState(false);

  //handle function for switch
  const handleToggle = () => {
    toggleUnit();
  };

  return (
    <div className="flex justify-between items-center w-full h-20 px-4">
      <div className="flex flex-row items-center">
        <img src="Images/cloud.png" alt="sun" className="object-cover mr-1" />
        <h1 data-testid="cypress-title" className="text-3xl font-bold ml-2">
          Weather
        </h1>
      </div>

      <div
        className="flex justify-end items-center"
        onClick={() => setIsSelected(!isSelected)}
        data-testid="temperature-toggle"
      >
        <div
          className={classNames(
            "flex w-20 h-11 m-2 rounded-full transition-all duration-500 border-2 border-slate-600",
            {
              "bg-blue-200": !isSelected,
              "bg-red-200": isSelected,
            }
          )}
          onClick={handleToggle}
        >
          <span
            className={classNames(
              "h-10 w-10 rounded-full flex items-center justify-center text-lg font-semibold text-white transition-all duration-500 shadow-xl",
              {
                "ml-10 bg-red-600": isSelected,
                "bg-blue-600": !isSelected,
              }
            )}
          >
            {isSelected ? "°F" : "°C"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
