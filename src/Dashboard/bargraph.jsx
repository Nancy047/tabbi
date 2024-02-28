import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LineGraph = () => {
  // Dummy data for demonstration
  const allIdlingTimeData = [
    { day: "Day 1", idlingTime: 16 },
    { day: "Day 2", idlingTime: 12 },
    { day: "Day 3", idlingTime: 7 },
    { day: "Day 4", idlingTime: 13 },
    { day: "Day 5", idlingTime: 5 },
    { day: "Day 6", idlingTime: 10 },
    { day: "Day 7", idlingTime: 11 },

    { day: "Day 8", idlingTime: 9 },
    { day: "Day 9", idlingTime: 14 },
    { day: "Day 10", idlingTime: 8 },
    { day: "Day 11", idlingTime: 6 },
    { day: "Day 12", idlingTime: 12 },
    { day: "Day 13", idlingTime: 10 },
    { day: "Day 14", idlingTime: 15 },

    { day: "Day 15", idlingTime: 10 },
    { day: "Day 16", idlingTime: 12 },
    { day: "Day 17", idlingTime: 8 },
    { day: "Day 18", idlingTime: 11 },
    { day: "Day 19", idlingTime: 5 },
    { day: "Day 20", idlingTime: 15 },
    { day: "Day 21", idlingTime: 10 },
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
      text: "Total Running time",
      colors: ["#333"],
    },
    xAxis: {
      categories: idlingTimeData.map((data) => data.day),
      title: {},
    },
    yAxis: {
      title: {
        text: "Running Time (hours)",
        colors: ["#333"],

      },
    },
    colors: ["#f36f00"], // Custom colors for the segments
    series: [
      {
        name: "Running Time per day",
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
          <option value={7}>1 week</option>
          <option value={14}>2 week</option>
          <option value={21}>3 week</option>
        </select>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LineGraph;
