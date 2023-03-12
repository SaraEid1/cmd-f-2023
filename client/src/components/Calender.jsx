import React from 'react';
import { format, startOfWeek, addDays, startOfMonth, parseISO, endOfMonth, endOfWeek, isSameMonth, startOfDay, isSameDay, parse, addMonths, subMonths } from 'date-fns';
import { FaHome, FaCalendarAlt, FaUtensils, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './Calender.css';
import dotLogoWhite from './dotLogoWhiteSVG.svg';
import navGuy from "./navbarGuy.svg";
import mood from "./moodWidget.svg";
import nutrition from "./nutritionWidget.svg";
import symptoms from "./symptomsWidget.svg";
import profile from "./profile.svg";

class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      data: null,
      startDates: [],
      ovulday: "0",
      displayText: "Omega-3 Fatty Acids and Fibre",
      displayTextMood: "increased energy levels, more focus, slight increase in body temperature",
      predictedPeriod: "",
      periodLength: "0",
      cycleLength: ""
    };
  }
  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:1000/data');
      const json = await response.json();

      const periods = json.Period;
      const cycleLength = json.cycleLength;
      console.log(cycleLength)
      const ovulday = (cycleLength / 2).toString();;
      const startDates = Object.values(periods).map(period => period.startDate);

      this.setState({ data: json, periods, startDates, ovulday });
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
    console.log("state", this.state.startDates);
    console.log(this.state.ovulday)
    const { currentMonth, selectedDate, startDates, ovulday } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    console.log("startDates", startDates);

    // Calculate ovulation date
    const ovulDate = addDays(startOfMonth(currentMonth), ovulday - 1);
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);

        const isPeriodDate = this.state.startDates.some((period) => {
          const periodDate = new Date(period);
          const periodDay = format(periodDate, "dd");
          const currentDay = format(day, "dd");
          return periodDay === currentDay;
        });

        //console.log('formattedDate:', formattedDate, 'isPeriodDate:', isPeriodDate, 'day:', day);
        console.log(format(day, "dd") === ovulday);

        const isOvulDay =
          isSameDay(day, ovulDate) ||
          isSameDay(day, addDays(ovulDate, 1)) ||
          isSameDay(day, addDays(ovulDate, 2)) ||
          isSameDay(day, addDays(ovulDate, 3));

        days.push(
          <div
            className={`col cell ${!isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
                ? "selected"
                : ""
              }`}
            key={day}
            onClick={(event) => this.onDateClick(day, event)}

          >
            <span className="number">{formattedDate}</span>
            {isPeriodDate && <div className="rectangle"></div>}
            {isOvulDay && <div className="green"></div>}
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


  onDateClick = (day, event) => {
    const targetClassList = event.target.classList;
    if (targetClassList.contains("rectangle")) {
      this.setState({ displayText: " Iron, Vitamin C and Magnesium" });
      this.setState({ displayTextMood: " cramps, bloating, tender breasts, mood swings, irritability, headaches, tiredness, lower back pain" });
    } else if (targetClassList.contains("green")) {
      this.setState({ displayText: "Vitamin D and Zinc" });
      this.setState({ displayTextMood: " Mood changes, such as irritability or depression, fatigue or lethargy" });
    } else {
      this.setState({ displayText: "" }); // clear the text if neither condition is met
      this.setState({ displayTextMood: "" });
    }
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
    const { currentMonth, selectedDate, startDates, ovulday, displayText, displayTextMood } = this.state;

    return (

      <div className="calendar">

        <div className="box1">
          <img src={dotLogoWhite} className="logo" />
          <h2>dot</h2>
          <img src={profile} id="circle" />
          <p className="name"> Jane Doe </p>

          <p id="nav">
            <span style={{ display: 'inline-flex', alignItems: 'center', paddingLeft: '20px' }}>
              <FaHome style={{ marginRight: '20px' }} />
              <Link to="/dashboard" > Dashboard </Link>
            </span>

            <div className="selected">
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <FaCalendarAlt style={{ marginRight: '20px' }} />
                <Link to="/calender"> Calendar </Link>
              </span>
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', paddingLeft: '20px' }}>
              <FaUtensils style={{ marginRight: '20px' }} />
              <Link to="/nutrition"> Nutrition </Link>
            </span>
          </p>
          <img src={navGuy} className="navguy" />
        </div>

        <div className="mainContent">
          <div className="topMenu" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <div className="header2">Calendar </div>
            <div className="date">Saturday March 11th, 2023 </div>
          </div>
          <div className="right">
            {this.renderHeader()}
            {this.renderDays()}
            {this.renderCells()}
          </div>
        </div>

        <div className="box6">

          <p className="overview" style={{ textAlign: 'center' }}>Today's Overview</p>

          <Link to="/nutrition"> <div className="nutrition">

            <div className='nutritiontext0'>Nutrition</div>
            <div className="nutritiontext">Key Nutrients: </div>
            <Link to="/nutrition"> {displayText && <div className='nutritiontextreg'>{displayText}</div>} </Link>
          </div> </Link>
          <div className="mood">

            <div className='symptomstext0'>Symptoms</div>
            {displayTextMood && <div className='nutritiontextreg'>{displayTextMood}</div>}
          </div>
          {/* <img src={mood} className="mood" />
            <p className="moodtext"> Mood </p>
            <img src={nutrition} className="nutrition" />
            <p className="nutritext"> Nutrition </p> */}


        </div>
      </div >
    );
  }
}

export default Calendar;