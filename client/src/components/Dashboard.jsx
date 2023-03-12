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
import profile from "./profile.svg";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <div className="mainContent">
          <div className="topMenu" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <div className="header">Dashboard </div>
            <div className="date">Saturday March 11th, 2023 </div>
          </div>
          <div className="box2">
            <img src={dashboardGuy} className="dashboardguy" />
            <div className="hello" >Welcome Back Jane.</div>
            <div className="regtext" style={{ width: '350px'}}>Just wanted to let you know that you're on day 14 of your flow. Hang in there, and don't forget to take care of yourself. You got this!</div>
          </div>
          <div className="side-stacked">
            <div className="box3">
              <p></p>
            </div>
            <div className="top-stacked">
              <div className="box4">
                <p></p>
              </div>
              <div className="box5">
                <p></p>
              </div>
              <div className = "side-stacked">
              <div className="box7">
                <p></p>
              </div>
              <div className="box8">
                <p></p>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="box1">
            <img src={dotLogoWhite} className="logo" />
            <img src={profile} id="circle" />
            <p className="name"> Jane Doe </p>
            <p id="nav">
              <div className="selected">
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <FaHome style={{ marginRight: '20px' }} />
                  <Link to="/dashboard" > Dashboard </Link>
                </span>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', paddingLeft: '20px' }}>
                <FaCalendarAlt style={{ marginRight: '20px' }} />
                <Link to="/calender"> Calendar </Link>
              </span>

              <span style={{ display: 'inline-flex', alignItems: 'center', paddingLeft: '20px' }}>
                <FaUtensils style={{ marginRight: '20px' }} />
                <Link to="/nutrition"> Nutrition </Link>
              </span>
            </p>
            <img src={navGuy} className="navguy" />
          </div>

          <div className="box6">

            <p className="overview">Today's Overview</p>
            <Link to="/nutrition"> <div className="nutrition"></div> </Link>
            <div className="mood"></div>
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
