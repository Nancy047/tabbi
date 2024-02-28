import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarChart = ({ runningTimes }) => {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Total Running Time",
    },
    xAxis: {
      categories: [
        "Day 1",
        "Day 2",
        "Day 3",
        "Day 4",
       
      ],
    },
    yAxis: {
      title: {
        text: "Total Running Time",
      },
    },
    series: [
      {
        name: "Running Time",
        data: runningTimes, // An array containing the total running time for each day
      },
    ],
  };

  return (
    <div
      className="chart-container"
      style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
    >
      {" "}
      {/* Apply CSS to this div */}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarChart;
