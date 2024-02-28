import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  faTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaPlus,
} from "react-icons/fa";

const Sidebarr = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "dashboard",
      icon: <></>,
    },
    {
      path: "/",
      name: "das",
      icon: <></>,
    },
    {
      path: "/",
      name: "",
      icon: <></>,
    },
  ];

  return (
    <div className="container">
      <div className="sidebar" style={{ sidth: isOpen ? "250px" : "50px" }}>
        <div className="top-sec">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            {" "}
            Tabbi
          </h1>

          <div style={{ marginLeft: isOpen ? "60px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>

        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};
export default Sidebarr;
