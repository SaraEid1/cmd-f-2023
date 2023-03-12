import React from "react";
import { Route, Routes } from "react-router-dom";
import Calendar from "./components/Calender";
import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";
import DisplayData from "./components/DisplayData";
import Login from "./components/Login"
import Map from "./components/Map";
// import OAuthRedirectHandler from "./components/OAuthRedirectHandler";

import { BrowserRouter as Router } from 'react-router-dom';
import "./App.css";

class App extends React.Component {
  render() {
    return (
        <Routes>
          <Route path="/calender" element={<Calendar />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/display" element={<DisplayData />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/auth" element={<OAuthRedirectHandler />} /> */}
          <Route path="/location" element={<Map />} />


        </Routes>
    );
  }
}

export default App;
