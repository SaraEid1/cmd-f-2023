import React from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUtensils, FaMapMarkerAlt, FaSignOutAlt  } from "react-icons/fa";
import Calendar from "./Calender";

import "./Dashboard.css";

class Dashboard extends React.Component {
    render() {
      return (
        <BrowserRouter>
          <div className="dashboard">
            <div className="header">
              <h1 className="dashboardtext">Dashboard</h1>
            </div>
            <div className="content">
              <div className="box1">
              <img src="./dotLogoWhite.png" className="logo"/>
                <h2>dot</h2>
                <div id="circle">  </div>
                <p className="name"> Name </p>
                <p id="nav">Dashboard
                
                <Link to="/calender">Calendar</Link>

                Nutrition
                Location
              </p>
              <p className="icons"><FaHome />
                <FaCalendarAlt />
                <FaUtensils />
                <FaMapMarkerAlt /> </p>
                
                <p className="logout"> Logout </p>
                <p className="icons1"><FaSignOutAlt  /> </p>
              </div>
              <div className="box2">
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
                <p></p>
              </div>
            </div>
          </div>
        </BrowserRouter>
      );
    }
  }
  
  export default Dashboard;
