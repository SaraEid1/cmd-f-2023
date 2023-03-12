import React from "react";
import { Route, Routes } from "react-router-dom";
import Calendar from "./components/Calender";
import Nutrition from "./components/Nutrition";
import NutritionMens from "./components/NutritionMens";
import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";
import DisplayData from "./components/DisplayData";
import Login from "./components/Login"
import Map from "./components/Map";
import NutritionOvul from "./components/NutritionOvul"


// import { BrowserRouter as Router } from 'react-router-dom';
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
  
  render() {

   

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
          <Route path="/location" element={<Map />} />


        </Routes>
    );
  }
}

export default App;
