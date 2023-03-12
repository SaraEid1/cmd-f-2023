import React from 'react';
import { format, startOfWeek, addDays, startOfMonth, parseISO , endOfMonth, endOfWeek, isSameMonth, startOfDay, isSameDay, parse, addMonths, subMonths } from 'date-fns';
import { FaHome, FaCalendarAlt, FaUtensils, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './Calender.css';
import dotLogoWhite from './dotLogoWhiteSVG.svg';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      data: null,
      startDates: []
    };
  }
  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:1000/data');
      const json = await response.json();
  
      const periods = json.Period;
      const cycleLength = json.cycleLength;
      console.log (cycleLength)
      const ovulday = cycleLength/2;
      const startDates = Object.values(periods).map(period => period.startDate);
  
      this.setState({ data: json, periods, startDates, ovulday});
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
<<<<<<< HEAD

  renderPeriod(){
    
  }

=======
>>>>>>> main
  renderCells() {
    console.log("state", this.state.startDates);
    console.log (this.state.ovulday)
    const { currentMonth, selectedDate, startDates } = this.state;
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
  
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(day)}
          >
            <span className="number">{formattedDate}</span>
            {isPeriodDate && <div className="rectangle"></div>}
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

export default Calendar;