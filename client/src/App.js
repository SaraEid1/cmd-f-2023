import React from "react";
import { Route, Routes } from "react-router-dom";
import Calendar from "./components/Calender";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router } from 'react-router-dom';
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
