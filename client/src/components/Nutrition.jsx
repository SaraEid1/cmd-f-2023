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
import lemonChicken from "./lemonChicken.svg";
import avocado from "./avocado.svg";
import steak from "./steak.svg";
import quinoa from "./quinoa.svg";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="nutritionMain">
        <div className="mainContent">
          <div className="topMenu" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <div className="header">Nutrition </div>
            <div className="date">Saturday March 11th, 2023 </div>
          </div>
          <div className = "nutriText"> Your menstrual phase is time to rest and replenish. Your body is undergoing a controlled inflammatory response to shed your uterine lining, so nourishing yourself with nutrient-dense, anti-inflammatory and iron-replenishing foods is important.</div>
          <Link to="https://www.twopeasandtheirpod.com/mediterranean-three-bean-quinoa-salad/" > <img src={lemonChicken} className="recipe" /> </Link>
          
          <img src={avocado} className="recipe" />
          <img src={steak} className="recipe" />
          <img src={quinoa} className="recipe" />
        </div>
        <div className="content">
          <div className="box1">
            <img src={dotLogoWhite} className="logo" />
            <h2>dot</h2>
            <img src={profile} id="circle" />
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
            <img src={navGuy} className="navguy" />
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
