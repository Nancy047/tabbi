import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarGraph = () => {
  // Dummy data for demonstration
  const driverBehaviorData = [
    { period: "Days 1", alertCount: 20 },
    { period: "Days 2", alertCount: 10.6 },
    { period: "Days 3", alertCount: 4 },
    { period: "Days 4", alertCount: 2.22 },
    { period: "Days 5", alertCount: 20 },
    { period: "Days 6", alertCount: 4.23 },
    { period: "Days 7", alertCount: 15 },
    { period: "Days 8", alertCount: 2 },
    { period: "Days 9", alertCount: 6 },
    { period: "Days 10", alertCount: 10 },
    { period: "Days 11", alertCount: 2.22 },
    { period: "Days 12", alertCount: 7 },
    { period: "Days 13", alertCount: 3.33 },
    { period: "Days 14", alertCount: 12 },
    // Add more data for additional periods...
  ];

  const [selectedWeek, setSelectedWeek] = useState("Week 1");
  const [options, setOptions] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: "Pilferage",
    },
    xAxis: {},
    yAxis: {
      title: {
        text: "Liters",
      },
    },
    colors: ["#3D8CC7"],
    series: [],
  });

  useEffect(() => {
    const getWeekData = () => {
      if (selectedWeek === "Week 1") {
        return driverBehaviorData.slice(0, 7);
      } else {
        return driverBehaviorData.slice(7);
      }
    };

    setOptions({
      ...options,
      xAxis: {
        categories: getWeekData().map((data) => data.period),
      },
      series: [
        {
          name: "Days",
          data: getWeekData().map((data) => data.alertCount),
        },
      ],
    });
  }, [selectedWeek]);

  const handleChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  return (
    <div style={{ boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)" }}>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <select
          value={selectedWeek}
          onChange={handleChange}
          className="bargraph-dropdown"
        >
          <option value="Week 1">Week 1</option>
          <option value="Week 2">Week 2</option>
          <option value="Week 2">Week 3</option>
        </select>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarGraph;
