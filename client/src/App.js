import React from "react";
import { Route, Routes } from "react-router-dom";
import Calendar from "./components/Calender";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router } from 'react-router-dom';
import "./App.css";

class App extends React.Component {
  render() {
    return (
        <Routes>
          {/* <Route path="/calendar" element={<Calendar />} /> */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
    );
  }
}

export default App;
