import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LineGraph = () => {
  // Dummy data for demonstration
  const allIdlingTimeData = [
    { day: "500", idlingTime: 360 },
    { day: "1000", idlingTime: 250 },
    { day: "1500", idlingTime: 200 },
    { day: "2000", idlingTime: 100 },
    { day: "2500", idlingTime: 20 },
    { day: "3000", idlingTime: 360 },
    { day: "3500", idlingTime: 220 },
    { day: "4000", idlingTime: 170 },
    { day: "4500", idlingTime: 100 },
    { day: "5000", idlingTime: 30 },
    { day: "5500", idlingTime: 280 },
    { day: "6000", idlingTime: 270 },
    { day: "6500", idlingTime: 150 },


    // Add more data here as needed
  ];

  const [selectedRange, setSelectedRange] = useState(7); // Default range of 7 days

  // Function to handle dropdown change
  const handleRangeChange = (event) => {
    setSelectedRange(parseInt(event.target.value));
  };

  let idlingTimeData;
  if (selectedRange === 7) {
    // Show data from 1st to 7th day
    idlingTimeData = allIdlingTimeData.slice(0, selectedRange);
  } else if (selectedRange === 14) {
    // Show data from 8th to 14th day
    idlingTimeData = allIdlingTimeData.slice(7, 14);
  }
  else if (selectedRange === 21) {
    // Show data from 8th to 14th day
    idlingTimeData = allIdlingTimeData.slice(15, 21);
  }

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Fuel vs Odometer",
      colors:["#333"]
    },
    xAxis: {
      categories: idlingTimeData.map((data) => data.day),
      title: {},
    },
    yAxis: {
      title: {
        text: "Fuel(level)",
        colors: ["#333"]

      },
    },
    colors: ["#f36f00"], // Custom colors for the segments
    series: [
      {
        name: "Odometers(in kms)",
        colors: ["#333"],
        data: idlingTimeData.map((data) => data.idlingTime),
      },
    ],
  };

  return (
    <div style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <select
          value={selectedRange}
          onChange={handleRangeChange}
          className="bargraph-dropdown"
        >
          <option value={7}>3500 Km</option>
          <option value={14}>3500-6500 Km</option>
          <option value={21}>6500-8500 Km</option>
        </select>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LineGraph;
