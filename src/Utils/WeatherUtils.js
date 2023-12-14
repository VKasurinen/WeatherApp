// Weather codes for the weekly highlight. I didn't find from the api this directly. Like this: weather code 0 -> "Clear sky"
const weatherCodes = {
    0: "Clear sky", //sun.png
    1: "Mainly clear", //few_clouds.png
    2: "Partly cloudy", //brokenclouds.png
    3: "Overcast", //scatteredclouds.png
    45: "Fog", //mist.png
    48: "Depositing rime fog", //mist.png
    51: "Drizzle",
    53: "Drizzle", //showerRain.png
    55: "Drizzle",
    56: "Freezing drizzle", //showerRain.png
    57: "Freezing drizzle",
    61: "Rain",
    63: "Rain", //rain.png
    65: "Rain",
    66: "Freezing rain",
    67: "Freezing rain",
    71: "Snowfall",
    73: "Snowfall", //snow.png
    75: "Snowfall",
    77: "Snow grains",
    80: "Rain showers", //showerRain.png
    81: "Rain showers",
    82: "Rain showers",
    85: "Snow showers", //snow.png
    86: "Snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm", //thunder.png
    99: "Thunderstorm",
  };


//Switch case for the weather images
const getWeatherImage = (weatherCode) => {
  switch (weatherCode) {
    case 0:
      return "/Images/weeklyImages/sun.png";
    case 1:
      return "/Images/weeklyImages/few_clouds.png";
    case 2:
      return "/Images/weeklyImages/brokenclouds.png";
    case 3:
      return "/Images/weeklyImages/scatteredclouds.png";
    case 45:
    case 48:
      return "/Images/weeklyImages/mist.png";
    case 51:
    case 53:
    case 55:
      return "/Images/weeklyImages/showerRain.png";
    case 56:
    case 57:
      return "/Images/weeklyImages/showerRain.png";
    case 61:
    case 63:
    case 65:
      return "/Images/weeklyImages/rain.png";
    case 66:
    case 67:
      return "/Images/weeklyImages/showerRain.png";
    case 71:
    case 73:
    case 75:
    case 77:
      return "/Images/weeklyImages/snow.png";
    case 80:
    case 81:
    case 82:
      return "/Images/weeklyImages/showerRain.png";
    case 85:
    case 86:
      return "/Images/weeklyImages/snow.png";
    case 95:
    case 96:
    case 99:
      return "/Images/weeklyImages/thunder.png";
    default:
      return "/Images/weeklyImages/few_clouds.png";
  }
};

export {weatherCodes, getWeatherImage};