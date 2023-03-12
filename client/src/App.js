import React from "react";
import { Route, Routes } from "react-router-dom";
import Calendar from "./components/Calender";
import Nutrition from "./components/Nutrition";
import NutritionMens from "./components/NutritionMens";
import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";
import DisplayData from "./components/DisplayData";
import Login from "./components/Login"
import NutritionOvul from "./components/nutritionOvul"
// import OAuthRedirectHandler from "./components/OAuthRedirectHandler";

import { BrowserRouter as Router } from 'react-router-dom';
import "./App.css";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      startDates: [],
      ovulday: "0",
      
      displayTextMood: null,
      predictedPeriod: "",
      periodLength: "0",
      cycleLength: ""
    };
  }
  /*async componentDidMount() {
    try {
      const response = await fetch('http://localhost:1000/data');
      const json = await response.json();

      const periods = json.Period;
      const cycleLength = json.cycleLength;
      console.log(cycleLength)
      console.log("App")
      
      const ovulday = (cycleLength / 2).toString();;
      const startDates = Object.values(periods).map(period => period.startDate);
      console.log(startDates)
      this.setState({ data: json, periods, startDates, ovulday });
    } catch (error) {
      console.error(error);
    }
  }*/

  render() {

    //const { startDates, ovulday, displayTextMood, predictedPeriod, periodLength, cycleLength } = this.state;

    return (
        <Routes>
          <Route path="/calender" element={<Calendar />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/nutritionmens" element={<NutritionMens />} />
          <Route path="/nutritionovul" element={<NutritionOvul />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/display" element={<DisplayData />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/auth" element={<OAuthRedirectHandler />} /> */}


        </Routes>
    );
  }
}

export default App;
