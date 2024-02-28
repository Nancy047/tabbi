import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import PieChart from "./HighPie";
import BarChart from "./RunningBarChart";
import MixedChar from "./MixedChart";
import Sample from "../components/sample";
import BarGraph from "./bargraph";
import Behaviour2 from "./behaviour2";

import Behavior from "./behaviour";
import Table from "../components/Table";
import "../styles/dashboard.css";
import truck from "../assets/Truck.png";
import metrics from "../assets/efficiencyblack.svg";

const Dashboard = () => {
  const fuelCapacity = 1000; // example value
  const utilizedFuel = 500;
  const runningTimes = [12, 15, 18, 9, 20, 16, 14];
  const [isTruckData, setIsTruckData] = useState(false);
  const [focus, setFocus] = useState(false);
  const [searchId, setSearchId] = useState(null);

  const handleFocus = (event) => {
    // setFocus(!focus);
    if (searchId && searchId.trim() !== "") {
      setIsTruckData(true);
    }
  };
  

  const handleKeyDown = (e) => {
    // Check if the pressed key is Enter (key code 13)
    if (e.key === "Enter") {
      handleFocus();
      setFocus(true);
    }
  };

  return (
    <div className="body">
      <div className="container" style={{ paddingLeft: "20px" }}>
        <div className="analytics-header">
          <img src={metrics}></img>
          <div className="desc-header">Efficiency metrics</div>
        </div>

        <div className="description">
          Elevate your operations and drive success with Efficiency Metrics,
          meticulously analyzing data to maximize performance and optimize
          results
        </div>

       
      </div>
      <div class="wrap">
        <div class="search">
         
          <input
            class="input-elevated"
            type="text"
            placeholder="Search Vehicle Id"
            onInput={(e) => setSearchId(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="searchbutton-container">
          <button type="submit" class="searchButton" onClick={handleFocus}>
            {/* <i class="fa fa-search"></i> */}
            Search
          </button>
        </div>
      </div>

      
      {isTruckData ? (
        <>
          <div style={{ height: "auto", marginTop: "95px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ margin: 10, width: "32%" }}>
                <PieChart
                  fuelCapacity={fuelCapacity}
                  utilizedFuel={utilizedFuel}
                />
              </div>
              <div style={{ margin: 10, width: "100%" }}>
                <BarChart runningTimes={runningTimes} />
              </div>
              <div style={{ margin: 10, width: "32%" }}>
                <Sample runningTimes={runningTimes} />
              </div>
            </div>
          </div>
          <div>
            

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ margin: 10, width: "32%" }}>
                <Behavior runningTimes={runningTimes} />
              </div>
              <div style={{ margin: 10, width: "100px" }}>
                <BarGraph runningTimes={runningTimes} />
              </div>
              <div style={{ margin: 10, width: "32%" }}>
                <Behaviour2 runningTimes={runningTimes} />
              </div>
            </div>
            <div>{/* <Table /> */}</div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Dashboard;
