//import { response } from "express";
import React, { useState, useEffect} from "react";
// import { useEffect } from 'react';
//import data from '../../server/data.json';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, parse, addMonths, subMonths} from 'date-fns'
import { FaHome, FaCalendarAlt, FaUtensils, FaMapMarkerAlt, FaSignOutAlt  } from "react-icons/fa";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import "./Calender.css";
// import dashboard from "./Dashboard";
import dotLogoWhite from "./dotLogoWhiteSVG.svg";
// import displayData from "../displayData"


class DisplayData extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  renderHeader() {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderPeriod(){
    
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
                    <div className="left">
              <img src={dotLogoWhite} className="logo"/>
              <h2>dot</h2>
              <div id="circle">  </div>
              <p className="name1"> Name </p>
              <p id="nav"> <Link to= "/dashboard"> Dashboard </Link>
            
              <Link to="/calender"> Calendar </Link>
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
            <div></div>
        <div className="right">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        </div>
      </div>
    );
  }
}

export default DisplayData;


// function DisplayData() {
//     const [data, setData] = useState(null);
  
//     useEffect(() => {
//         async function fetchData() {
//           try {
//             const response = await fetch('http://localhost:1000/data');
//             const json = await response.json();
//             console.log(json);
//             setData(json);
//           } catch (error) {
//             console.error(error);
//           }
//         }
//         fetchData();
//       }, []);
      
  
//     if (!data) {
//       return <div>Loading...</div>;
//     }
//     // useEffect(() => {
//     //     async function fetchAppUrl() {
//     //         const response = await fetch(`http://localhost:1000/getData/`)
//     //         const data = await response.json(response)
//     //         console.log("DATA: ", data)
//     //         console.log(data)
//     //         setUrl(data)
//     //         console.log("URL: ", url)


//     //     }
//     //     fetchAppUrl();
//     // }, [])

//     // useEffect(() => {
//     //     async function fetchAppData() {
//     //         console.log(url)
//     //         const response = await fetch(url.url)
//     //         const data = await response.json(response)
//     //         console.log(data)
//     //     }
//     //     fetchAppData()
//     // }, [url])




//     return (
//         <table>
//             <thead>
//                 <tr>
//                     <th>Date</th>
//                 </tr>
//             </thead>
//             <tbody>

//                 {/* {data.map((person, index) => (
//               <tr key={index}>
//                 <td>{person.name}</td>
//                 <td>{person.age}</td>
//               </tr>
//             ))} */}
//             </tbody>
//         </table>
//     );


// }

// export default DisplayData;