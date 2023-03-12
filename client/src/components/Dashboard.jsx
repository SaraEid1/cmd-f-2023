import React from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUtensils, FaMapMarkerAlt, FaSignOutAlt  } from "react-icons/fa";
import dashboard from "./Dashboard";

import "./Dashboard.css";
import dotLogoWhite from "./dotLogoWhiteSVG.svg";
import dashboardGuy from "./dashboardGuy.svg";
import dashboardBG from "./dashboardBG.svg";
import mood from "./moodWidget.svg";
import nutrition from "./nutritionWidget.svg";
import symptoms from "./symptomsWidget.svg";
import navGuy from "./navbarGuy.svg";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <div className="header">
          <h1 className="dashboardtext">Dashboard</h1>
        </div>
        <div className="content">
          <div className="whitespace"></div>
          <div className="box1">
            <img src={dotLogoWhite} className="logo"/>
            <h2>dot</h2>
            <div id="circle">  </div>
            <p className="name"> Name </p>
            <p id="nav"> <Link to= "/dashboard"> Dashboard </Link>
              <Link to="/calender"> Calendar </Link>
              Nutrition
              Location
            </p>
            <p className="icons">
              <FaHome />
              <FaCalendarAlt />
              <FaUtensils />
              <FaMapMarkerAlt />
            </p>
            <p className="logout"> Logout </p>
            <p className="icons1"><FaSignOutAlt  /> </p>
            <img src={navGuy} className="navguy"/>
          </div>
          <div className="box2">
            <img src={dashboardGuy} className="dashboardguy"/>
            <p></p>
          </div>
          <div className="box3">
            <p></p>
          </div>
          <div className="box4">
            <p></p>
          </div>
          <div className="box5">
            <p></p>
          </div>
          <div className="box6">

            <p className="overview">Today's Overview</p>
            <img src={mood} className="mood"/>
            <p className="moodtext"> Mood </p>
            <img src={nutrition} className="nutrition"/>
            <p className="nutritext"> Nutrition </p>
            <img src={symptoms} className="symptoms"/>
            <p className="symptomstext"> Symptoms </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
