import React from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUtensils, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";
import dashboard from "./Dashboard";

import "./Nutrition.css";
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
      <div className="nutritionMain">
        <div className="mainContent">
          <div className="topMenu" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <div className="header">Nutrition </div>
            <div className="date">Saturday March 11th, 2023 </div>
          </div>

        </div>
        <div className="content">
          <div className="box1">
            <img src={dotLogoWhite} className="logo" />
            <h2>dot</h2>
            <div id="circle">  </div>
            <p className="name"> Jane Doe </p>

            <p id="nav">
              <span style={{ display: 'inline-flex', alignItems: 'center', paddingLeft: '20px' }}>
                <FaHome style={{ marginRight: '20px' }} />
                <Link to="/dashboard" > Dashboard </Link>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', paddingLeft: '20px' }}>
                <FaCalendarAlt style={{ marginRight: '20px' }} />
                <Link to="/calender"> Calendar </Link>
              </span>
              <div className="selected">
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <FaUtensils style={{ marginRight: '20px' }} />
                  <Link to="/nutrition"> Nutrition </Link>
                </span>
              </div>
            </p>
            {/* <p className="icons">
              <FaHome />
              <FaCalendarAlt />
              <FaUtensils />
              <FaMapMarkerAlt />
            </p> */}
            <img src={navGuy} className="navguy" />
          </div>
          <div className="box2">
            <img src={dashboardGuy} className="dashboardguy" />
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
            <div className = "nutrition"></div>
            <div className = "mood"></div>
            {/* <img src={mood} className="mood" />
            <p className="moodtext"> Mood </p>
            <img src={nutrition} className="nutrition" />
            <p className="nutritext"> Nutrition </p> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
