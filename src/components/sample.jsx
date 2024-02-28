import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LineGraph = () => {
  // Dummy data for demonstration
  const totalHoursData = [
    { day: "Day 1", hours: 8 },
    { day: "Day 2", hours: 7 },
    { day: "Day 3", hours: 6 },
    { day: "Day 4", hours: 7.5 },
    { day: "Day 5", hours: 8.5 },
    { day: "Day 6", hours: 9 },
    { day: "Day 7", hours: 7 },
  ];

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Total Hours Traveled per Day",
    },
    xAxis: {
      categories: totalHoursData.map((data) => data.day),
      title: {
        text: "Day",
      },
    },
    yAxis: {
      title: {
        text: "Total Hours",
      },
    },
    colors: ["#3D8CC7"],
    series: [
      {
        name: "Days",
        data: totalHoursData.map((data) => data.hours),
      },
    ],
  };

  return (
    <div style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LineGraph;
