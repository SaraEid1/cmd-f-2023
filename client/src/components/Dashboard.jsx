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
import nutritionFace from "./nutritionFace.svg";
import moodFace from "./moodFace.svg";

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
      daysinCycle: "0",
      displayText: "Omega-3 Fatty Acids and Fibre",
      displayTextMood: "increased energy levels, more focus, slight increase in body temperature"
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:1000/data');
      const json = await response.json();

      const periods = json.Period;
      const cycleLength = json.cycleLength;
      const periodLength = json.periodLength;
      const daysSinceLastPeriod = json.daysSinceLastPeriod;
      const daysUntilNextPeriod = json.daysUntilNextPeriod;
      const daysinCycle = json.daysinCycle;

      const ovulday = (cycleLength / 2).toString();;
      const startDates = Object.values(periods).map(period => period.startDate);
      console.log(startDates)
      this.setState({ data: json, periods, startDates, ovulday, cycleLength, periodLength, daysSinceLastPeriod, daysUntilNextPeriod, daysinCycle });
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
            <div className="date">Sunday March 12th, 2023 </div>
          </div>
          <div className="box2">
            <img src={dashboardGuy} className="dashboardguy" />
            <div className="hello" >Welcome Back Jane.</div>
            <div className="regtext" style={{ width: '350px' }}>Just wanted to let you know that you're on day 9 of your flow. Hang in there, and don't forget to take care of yourself. You got this!</div>
          </div>
          <div className="side-stacked">
            <div className="box3" style={{ padding: '20px' }}>
              <div className="red" style={{ paddingBottom: '20px' }}>{this.state.daysinCycle}/30</div> <div>You are on day 9 out of 30 on your period cycle! Remember to drink plenty of water. </div>
              <div className="bold" style={{ paddingTop: '20px' }}>You are in the follicular phase</div>
            </div>
            <div className="top-stacked">
              <div className="box4" style={{ display: 'flex', alignItems: 'baseline', paddingLeft: '20px' }}>
                <div className="red">{this.state.daysUntilNextPeriod}</div>
                <div style={{ marginLeft: '5px' }}>days until your next period begins</div>
              </div>
              <div className="box5" style={{ display: 'flex', alignItems: 'baseline', paddingLeft: '20px' }}>
                <div className="red">{this.state.daysSinceLastPeriod}</div>
                <div style={{ marginLeft: '5px' }}>since your last period ended</div>
              </div>
              <div className="side-stacked">
                <div className="box7" style={{ display: 'flex', alignItems: 'baseline', paddingLeft: '20px', flexDirection: 'column' }}>
                  <div className="side-stacked" style={{ alignItems: 'baseline', marginTop: '-8px' }}>
                    <div className="red">{this.state.periodLength}</div>
                    <div style={{ marginLeft: '5px' }}>days</div>
                  </div>

                  <div className="bold" >Usual Period Length</div>
                </div>
                <div className="box8" style={{ display: 'flex', alignItems: 'baseline', paddingLeft: '20px', flexDirection: 'column' }}>
                  <div className="side-stacked" style={{ alignItems: 'baseline', marginTop: '-8px' }}>
                    <div className="red">{this.state.cycleLength}</div>
                    <div style={{ marginLeft: '5px' }}>days</div>
                  </div>

                  <div className="bold" >Usual Cycle Length</div>
                </div>
              </div>
            </div>

          </div>
          <div className="box10">
            <img src={dashboardGuy} className="dashboardguy" />
            <div className="hello" >Feminine Hygiene Products Near Your</div>
            <div className="regtext" style={{ width: '350px' }}>insert list here</div>
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

            <p className="overview" style={{ textAlign: 'center' }}>Overview</p>
            <Link to="/nutrition">  <div className="nutrition">
              <img src={nutritionFace} className="nutritionFace" style={{
                float: 'right',
                paddingTop: '220px',
              }} />
              <div className='nutritiontext0'>Nutrition</div>
              <div className="nutritiontext">Key Nutrients: </div>
              {this.state.displayText && <div className='nutritiontextreg'>{this.state.displayText}</div>}
            </div> </Link>

            <div className="mood">

              <div className='symptomstext0'>Symptoms</div>
              {this.state.displayTextMood && <div className='nutritiontextreg'>{this.state.displayTextMood}</div>}
              <img src={moodFace} className="moodFace" style={{
                float: 'right',
                position: 'absolute',
                top: '670px',
                right: '50px'
              }} />
            </div>
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
