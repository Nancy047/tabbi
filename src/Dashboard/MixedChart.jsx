import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const CombinedChart = () => {
  // Dummy data for demonstration
  const data = [
    { day: "Day 1", fuelConsumed: 50, totalTime: 10, distanceTraveled: 100 },
    { day: "Day 2", fuelConsumed: 45, totalTime: 15, distanceTraveled: 80 },
    { day: "Day 3", fuelConsumed: 60, totalTime: 12, distanceTraveled: 120 },
    { day: "Day 4", fuelConsumed: 55, totalTime: 18, distanceTraveled: 90 },
    { day: "Day 5", fuelConsumed: 70, totalTime: 14, distanceTraveled: 150 },
    { day: "Day 6", fuelConsumed: 65, totalTime: 18, distanceTraveled: 130 },
    { day: "Day 7", fuelConsumed: 80, totalTime: 13, distanceTraveled: 180 },
  ];

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Vehicle Metrics",
    },
    xAxis: {
      categories: data.map((entry) => entry.day),
    },
    yAxis: [
      {
        // Primary yAxis for fuel consumption
        title: {
          text: "Fuel Consumed (L)",
        },
      },
      {
        // Secondary yAxis for time and distance
        title: {
          text: "Time / Distance (hrs / km)",
        },
        opposite: true,
      },
    ],
    series: [
      {
        name: "Fuel Consumed",
        type: "column",
        data: data.map((entry) => entry.fuelConsumed),
        yAxis: 0,
      },
      {
        name: "Total Time",
        type: "line",
        data: data.map((entry) => entry.totalTime),
        yAxis: 1,
      },
      {
        name: "Distance Traveled",
        type: "line",
        data: data.map((entry) => entry.distanceTraveled),
        yAxis: 1,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default CombinedChart;
