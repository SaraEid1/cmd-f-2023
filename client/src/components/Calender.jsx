import React from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, parse, addMonths, subMonths } from 'date-fns';
import { FaHome, FaCalendarAlt, FaUtensils, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './Calender.css';
import dotLogoWhite from './dotLogoWhiteSVG.svg';
import navGuy from "./navbarGuy.svg";
import mood from "./moodWidget.svg";
import nutrition from "./nutritionWidget.svg";
import symptoms from "./symptomsWidget.svg";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      data: null,
    };
  }
  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:1000/data');
      const json = await response.json();

      this.setState({ data: json }, () => {
        const periods = this.state.data.Period;
        //console.log(periods);
        const periodsarray = Object.values(periods);
        for (let i = 0; i < periodsarray.length; i++) {
          const startDate = periodsarray[i].startDate;
          const endDate = periodsarray[i].endDate;
          const flow = periodsarray[i].flow;
          //console.log(startDate, flow);
        }
        this.setState({ periods }, () => {
          //console.log(this.state.periods);
        });
      });
    } catch (error) {
      console.error(error);
    }
  }



  renderHeader() {
    const dateFormat = 'MMMM yyyy';

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
    const dateFormat = 'dddd';
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

  renderCells() {
    console.log("hello")
    console.log(this.state.periods);
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${!isSameMonth(day, monthStart)
                ? 'disabled'
                : isSameDay(day, selectedDate)
                  ? 'selected'
                  : ''
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

  onDateClick = (day) => {
    this.setState({
      selectedDate: day,
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1),
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1),
    });
  };

  render() {
    return (
      <div className="calendar">
        <div className="box1">
            <img src={dotLogoWhite} className="logo" />
            <h2>dot</h2>
            <div id="circle">  </div>
            <p className="name"> Jane Doe </p>

            <p id="nav">
              <span style={{ display: 'inline-flex', alignItems: 'center', paddingLeft: '20px' }}>
                <FaHome style={{ marginRight: '20px' }} />
                <Link to="/dashboard" > Dashboard </Link>
              </span>
              
              <div className="selected">
              <span style={{ display: 'inline-flex', alignItems: 'center'}}>
                <FaCalendarAlt style={{ marginRight: '20px' }} />
                <Link to="/calender"> Calendar </Link>
              </span>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', paddingLeft: '20px'  }}>
                  <FaUtensils style={{ marginRight: '20px' }} />
                  <Link to="/nutrition"> Nutrition </Link>
                </span>
            </p>
            {/* <p className="icons">
              <FaHome />
              <FaCalendarAlt />
              <FaUtensils />
              <FaMapMarkerAlt />
            </p> */}
            <img src={navGuy} className="navguy" />
          </div>
        <div></div>
        <div className="right">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
        <div className="box6">

            <p className="overview">Today's Overview</p>
            <div className = "nutrition"></div>
            <div className = "mood"></div>
            {/* <img src={mood} className="mood" />
            <p className="moodtext"> Mood </p>
            <img src={nutrition} className="nutrition" />
            <p className="nutritext"> Nutrition </p> */}
          </div>
      </div>
    );
  }
}

export default Calendar;