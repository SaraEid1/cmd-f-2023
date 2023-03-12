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
import nutritionFace from "./nutritionFace.svg";
import moodFace from "./moodFace.svg";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="nutritionMain">
        <div className="mainContent">
          <div className="topMenu" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <div className="header">Nutrition </div>
            <div className="date">Sunday March 12th, 2023 </div>
          </div>
          <div className = "nutriText"> </div>

          <Link to="https://www.twopeasandtheirpod.com/mediterranean-three-bean-quinoa-salad/" > <img src={lemonChicken} className="recipe" /> </Link>
          <Link to="https://www.seriouseats.com/avocado-toast-smoked-salmon-goat-cheese-capers" > <img src={avocado} className="recipe" /> </Link>
          <Link to="https://iowagirleats.com/steak-and-sweet-potato-bowls-with-avocado-cilantro-drizzle/" > <img src={steak} className="recipe" /> </Link>
          <Link to="https://www.twopeasandtheirpod.com/mediterranean-three-bean-quinoa-salad/" > <img src={quinoa} className="recipe" /> </Link>
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
            <p className="overview" style={{ textAlign: 'center' }}>Overview</p>
            <Link to="/nutrition"> <div className="nutrition">
            <img src={nutritionFace} className="nutritionFace" style={{
                float: 'right',
                paddingTop: '220px',
              }} /></div> </Link>
            <div className="mood"></div>
            <img src={moodFace} className="moodFace" style={{
                float: 'right',
                position: 'absolute',
                top: '670px',
                right: '50px'
              }} />
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
