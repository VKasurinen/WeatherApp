import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = ({ selectedUnit, setSelectedUnit, weatherData }) => {
  const [chartOptions, setChartOptions] = useState({
    title: {
      text: null,
    },
    xAxis: {
      categories: [], // Placeholder for days
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        formatter: function () {
          return selectedUnit === "metric"
            ? `${this.value}°C`
            : `${this.value}°F`;
        },
      },
    },
    series: [
      {
        name: null,
        data: [], // Placeholder for temperature data
        color: "red",
        showInLegend: false,
      },
    ],
    chart: {
      type: "line",
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, // Change to normal gradient
        stops: [
          [0, "rgba(147, 197, 253, 0.5)"],
          [0.5, "rgba(0, 0, 75, 0.08)"],
          [1, "rgba(250, 250, 250, 0)"],
        ],
      },
      accessibility: {
        enabled: true, // Enable accessibility module
      },
    },
  });

  /**
   * This use effect fetches the data from the both fahrenheit and celsius API.
   *
   */

  useEffect(() => {
    if (weatherData) {
      const hourlyData = weatherData.hourly;

      // Extract timestamps and convert them to date strings (short month and day format)
      const days = hourlyData.time.map((time) => {
        const date = new Date(time);
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      });

      const temperatures = hourlyData.temperature_2m; // Extract temperature data from the API response

      // Determine the min and max temperature from the fetched data
      const minTemp = Math.min(...temperatures);
      const maxTemp = Math.max(...temperatures);

      setChartOptions((prevOptions) => ({ // Update the chart options
        ...prevOptions,
        yAxis: {
          ...prevOptions.yAxis,
          labels: {
            formatter: function () {  // Update the label formatting based on the selected unit
              return selectedUnit === "metric"
                ? `${this.value}°C`
                : `${this.value}°F`;
            },
          },
          // Set min and max values for the yAxis
          min: minTemp - 5,
          max: maxTemp + 5,
        },
        xAxis: {
          ...prevOptions.xAxis,
          categories: days,
        },
        series: [
          {
            ...prevOptions.series[0],
            data: temperatures, 
            color: selectedUnit === "metric" ? "blue" : "red", // Set the color of the chart line based on the selected unit
          },
        ],
      }));
    }
  }, [selectedUnit, weatherData]);

  return (
    <div className="left-2 ml-10 mt-2">
      <h1 className="text-xl font-semibold">Hourly Chart</h1>

      <div className="mt-5 mr-10 rounded-lg overflow-hidden">
        <HighchartsReact
          containerProps={{ style: { width: "100%" } }}
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default Chart;
