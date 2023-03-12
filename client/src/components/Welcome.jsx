import React from "react";
import "./Welcome.css";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome-page">
        <div className="background-image"></div>
        <div className="header">
        <h2>dot.</h2>
        <span className="features"> Features </span>
        <span className="aboutus"> About Us </span>
        <span className="loginspan">  </span>
        <span className="login"> Login </span>

        </div>
        <div className="content">
          <h1>your period your way</h1>
          
          <p classname="description">Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, Mauris consequat tellus id tempus aliquet. mattis tellus. Sed dignissim, metus nec fringilla accumsan, Mauris consequat tellus id tempus aliquet.</p>
         <Link to="/dashboard"> <button> Get Started </button></Link>
<div class="welcome-box1">
  <p></p>
</div>
<div class="welcome-box2">
  <p></p>
</div>
<div class="welcome-box3">
  <p></p>
</div>

        </div>
      </div>
    );
  }
}

export default Welcome;
