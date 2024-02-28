import React, { useState } from "react";
import "../styles/sidebar.css";


const MySide = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "" : "close"} ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <header>
        <div className="image-text">
          <span className="image">
            <img
              src="https://t4.ftcdn.net/jpg/04/06/91/91/240_F_406919147_D3WsGjwXj1qmFNrei2ZFvBWwiueRcFmg.jpg"
              alt="logo"
            />
          </span>
          <div className="text header-text">
            <span className="main">Sidebar</span>
          </div>
        </div>
        <i
          className="bx bx-chevron-right toggle"
          onClick={handleToggleSidebar}
        ></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <ul class="menu-links">
            <li class="search-bar">
              <i class="bx bx-search icons"></i>
            </li>
            <li class="nav-link">
              <a href="#">
                <i class="bx bx-home-alt icons"></i>
                <span class="text nav-text">Dashboard</span>
              </a>
            </li>
            <li class="nav-link">
              <a href="#">
                <i class="bx bx-bar-chart-alt-2 icons"></i>
                <span class="text nav-text">Revenue</span>
              </a>
            </li>
            <li class="nav-link">
              <a href="#">
                <i class="bx bx-bell icons"></i>
                <span class="text nav-text">Notifications</span>
              </a>
            </li>
            <li class="nav-link">
              <a href="#">
                <i class="bx bx-pie-chart-alt icons"></i>
                <span class="text nav-text">Analytics</span>
              </a>
            </li>
            <li class="nav-link">
              <a href="#">
                <i class="bx bx-heart icons"></i>
                <span class="text nav-text">Likes</span>
              </a>
            </li>
            <li class="nav-link">
              <a href="#">
                <i class="bx bx-wallet-alt icons"></i>
                <span class="text nav-text">Wallets</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          <li class="nav-link">
            <a href="#">
              <i class="bx bx-log-out icons"></i>
              <span class="text nav-text">Log Out</span>
            </a>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default MySide;
