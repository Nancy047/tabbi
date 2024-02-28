      import React from "react";
      import Highcharts from "highcharts";
      import HighchartsReact from "highcharts-react-official";

      const PieChart = ({ fuelCapacity, utilizedFuel }) => {
        const options = {
          chart: {
            type: "pie",
          },
          title: {
            text: "Fuel Capacity vs Utilized Fuel",
          },
          plotOptions: {
            pie: {
              showInLegend: true,
              dataLabels: {
                enabled: false, // Disable data labels
              },
            },
          },
          colors: ["#f58c34", "#3D8CC7"], // Custom colors for the segments
          
          series: [
            {
              name: "Fuel",
              colorByPoint: true,
              data: [
                {
                  name: "Fuel Capacity",
                  y: fuelCapacity,
                  sliced: true,
                  selected: true,
                },
                {
                  name: "Utilized Fuel",
                  y: utilizedFuel,
                },
              ],
            },
          ],
        };

        return (
          <div style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        );
      };

      export default PieChart;
