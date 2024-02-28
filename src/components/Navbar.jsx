import React from 'react'
import logo from "../assets/logo.png";
import taabi2 from "../assets/taabi2.png";


import settings from '../assets/settings.png'

const Navbar = () => {
  return (
    <div className="navbar_container">
      <div className="logo_container">
        <img src={taabi2} alt="" />
      </div>
      <div className="user_container">
        <div className="profile">SJ</div>
        <div className="user_name">Sebastion, John</div>
      </div>
    </div>
  );
}

export default Navbar