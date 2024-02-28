import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarGraph = () => {
  // Dummy data for demonstration
  const driverBehaviorData = [
    { period: "Days 1", alertCount: 10 },
    { period: "Days 2", alertCount: 15 },
    { period: "Days 3", alertCount: 8 },
    { period: "Days 4", alertCount: 12 },
    { period: "Days 5", alertCount: 6 },
    { period: "Days 6", alertCount: 8 },
    { period: "Days 7", alertCount: 12 },

    // Add more data for additional periods...
  ];

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Driver Behavior Alert Count",
    },
    xAxis: {
      categories: driverBehaviorData.map((data) => data.period),
      title: {
        text: "Period",
      },
    },
    yAxis: {
      title: {
        text: "No of Alert Count",
      },
    },
    colors: ["#3D8CC7"],
    series: [
      {
        name: "Alert Count per day",
        data: driverBehaviorData.map((data) => data.alertCount),
      },
    ],
  };

  return (
    <div style={{ boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarGraph;
