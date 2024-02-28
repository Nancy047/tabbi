import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import PieChart from "./HighPie";
import BarChart from "./RunningBarChart";
import MixedChar from "./MixedChart";
import Sample from "./sample";
import BarGraph from "./bargraph";
import Behavior from "./behaviour";
import Table from "../components/Table";



export const Home = () => {


  return (
    <div className="body">
      <div className="input-container">
        <input className="input-field" type="text" class="input-field" placeholder="Input 1"></input>
        <input type="text" class="input-field" placeholder="Input 1"></input>
        <input type="text" class="input-field" placeholder="Input 1"></input>
      </div>
    </div>
  );
};
