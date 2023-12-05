import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const celsiusURL =
  "https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&current=temperature_2m,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=auto";

const fahrenheitURL =
  "https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&current=temperature_2m,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=ms&timezone=auto";

const Chart = ({ selectedUnit, setSelectedUnit }) => {
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
   *
   */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          selectedUnit === "metric" ? celsiusURL : fahrenheitURL
        );

        if (response.ok) {
          const data = await response.json();
          const hourlyData = data.hourly;

          const days = hourlyData.time.map((time) => {
            const date = new Date(time);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          });

          const temperatures = hourlyData.temperature_2m;

          // Determine the min and max temperature from the fetched data
          const minTemp = Math.min(...temperatures);
          const maxTemp = Math.max(...temperatures);

          // Update the chart options
          setChartOptions((prevOptions) => ({
            ...prevOptions,
            yAxis: {
              ...prevOptions.yAxis,
              labels: {
                formatter: function () {
                  return selectedUnit === "metric"
                    ? `${this.value}°C`
                    : `${this.value}°F`;
                },
              },
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
                color: selectedUnit === "metric" ? "blue" : "red",
              },
            ],
          }));
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedUnit, setSelectedUnit]);

  return (
    <div className="left-2 ml-10 mt-1">
      <h1 className="text-xl font-semibold">Hourly Chart</h1>

      <div className="mt-4 mr-10 rounded-lg overflow-hidden">
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
