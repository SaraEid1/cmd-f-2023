import React from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';


import "./Dashboard.css";

class Dashboard extends React.Component {
    render() {
      return (
        <div className="dashboard">
          <div className="header">
            <h1>Dashboard</h1>
          </div>
          <div className="content">
            <div className="box1">
              <h2>dot</h2>
              <div id="circle">  </div>
              <p id="nav">Dashboard
              <Link to="/calendar">Calendar</Link>
Calendar
Nutrition
Location
</p>
            </div>
            <div className="box2">
              <h2>Box 2</h2>
              <p></p>
            </div>
            <div className="box3">
              <h2>Box 3</h2>
              <p></p>
            </div>
            <div className="box4">
              <h2>Box 4</h2>
              <p>This is the content of box 4.</p>
            </div>
            <div className="box5">
              <h2>Box 5</h2>
              <p></p>
            </div>
            <div className="box6">
              <h2>Box 6</h2>
              <p></p>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default Dashboard;