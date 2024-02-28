import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Trip from "../components/Analytics/Trip-analytics";
import Dashboard from "../Dashboard/dashboard";
import "../styles/MainPage.css";
import metricsblue from "../assets/efficiencyblue.svg";
import metricsblack from "../assets/efficiencyblack.svg";
import tripblue from "../assets/tripblue.svg";
import tripblack from "../assets/tripblack.svg";
import aiblue from "../assets/chatblackicon.svg";
import aiblack from "../assets/chatblue.svg";
export const MainPage = () => {
  var dataFromChild;
  const [currentTab, setCurrentTab] = useState("Metrics");
  const [show, setshow] = useState(false);
  const recievedata = (data) => {
    setshow(data);
    console.log(data, "mainpage");
  };
  return (
    <div className="body">
      <div className={show ? "my_home" : "home_container"}>
        <div className="home_body">
          <div className="chat_container">
            <div>
              <Home senddatatomain={recievedata} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
