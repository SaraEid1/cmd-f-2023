import React from "react";
import { Route, Routes } from "react-router-dom";
import Calendar from "./components/Calender";
import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router } from 'react-router-dom';
import "./App.css";

class App extends React.Component {
  render() {
    return (
        <Routes>
          <Route path="/calender" element={<Calendar />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
    );
  }
}

export default App;
