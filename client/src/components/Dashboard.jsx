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
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      startDates: [],
      ovulday: "0",
      
      displayTextMood: null,
      predictedPeriod: "",
      periodLength: "0",
      cycleLength: "0",
      daysSinceLastPeriod: "0",
      daysUntilNextPeriod: "0",
      daysinCycle: "0"
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:1000/data');
      const json = await response.json();

      const periods = json.Period;
      const cycleLength = json.cycleLength;
      const periodLength = json.periodLength;
      const daysSinceLastPeriod= json.daysSinceLastPeriod;
      const daysUntilNextPeriod= json.daysUntilNextPeriod;
      const daysinCycle= json.daysinCycle;
      
      const ovulday = (cycleLength / 2).toString();;
      const startDates = Object.values(periods).map(period => period.startDate);
      console.log(startDates)
      this.setState({ data: json, periods, startDates, ovulday, cycleLength, periodLength,daysSinceLastPeriod, daysUntilNextPeriod, daysinCycle});
    } catch (error) {
      console.error(error);
    }
  }
  render() {
   // const { cycleLength } = this.state;

    return (
      <div className="dashboard">
        <div className="mainContent">
          <div className="topMenu" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <div className="header">Dashboard </div>
            <div className="date">Saturday March 11th, 2023 </div>
          </div>
          <div className="box2">
            <img src={dashboardGuy} className="dashboardguy" />
            <p></p>
          </div>
          <div className="side-stacked">
            <div className="box3">
            <div>{this.state.daysinCycle}</div> <div>days</div>
            </div>
            <div className="top-stacked">
              <div className="box4">
              <div>{this.state.daysUntilNextPeriod}</div> <div>days</div>
              </div>
              <div className="box5">
              <div>{this.state.daysSinceLastPeriod}</div> <div>days</div>

              </div>
              <div className = "side-stacked">
              <div className="box7">
              <div>{this.state.periodLength}</div> <div>days</div>
                <p></p>
              </div>
              <div className="box8">
              <div>{this.state.cycleLength}</div> <div>days</div>
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
            <div className="nutrition"></div>
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
