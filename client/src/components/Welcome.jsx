import React from "react";
import "./Welcome.css";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import dotLogoBlack from "./dotLogoSVG.svg";

class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome-page">
        <div className="background-image"></div>
        <div className="header">
        <img src={dotLogoBlack} className="logo"/>
        <span className="features"> Features </span>
        <span className="aboutus"> About Us </span>
        <span className="loginspan">  </span>
        {/* <span className="login"> <Link to="/login">Login</Link></span> */}
        {/* <Link to="/https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.reproductive_health.read%20profile%20email%20openid&state=%7B%7D&response_type=code&client_id=173285732369-tefattcjqd7j9lmahul2qki4hsgjtbr8.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A1000%2Fdata" className="login"> Login </Link> */}
        <Link to="/login" className="login"> Login </Link>

        

        </div>
        <div className="content">
          <h1>your period your way</h1>
          
          <p className="description">Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, Mauris consequat tellus id tempus aliquet. mattis tellus. Sed dignissim, metus nec fringilla accumsan, Mauris consequat tellus id tempus aliquet.</p>
         <Link to="/dashboard"> <button> Get Started </button></Link>
<div className="welcome-box1">
  <p></p>
</div>
<div className="welcome-box2">
  <p></p>
</div>
<div className="welcome-box3">
  <p></p>
</div>

        </div>
      </div>
    );
  }
}

export default Welcome;
