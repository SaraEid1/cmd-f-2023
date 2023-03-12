import React from "react";
import "./Welcome.css";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import dotLogoBlack from "./dotLogoSVG.svg";

class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome-page">
        <div className="header">
        <img src={dotLogoBlack} className="logo"/>
        <span className="loginspan">  </span>
        {/* <span className="login"> <Link to="/login">Login</Link></span> */}
        {/* <Link to="/https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.reproductive_health.read%20profile%20email%20openid&state=%7B%7D&response_type=code&client_id=173285732369-tefattcjqd7j9lmahul2qki4hsgjtbr8.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A1000%2Fdata" className="login"> Login </Link> */}
        <Link to="/login" className="login"> Login </Link>
        </div>
        <div className="content" >
          <h1 style = {{marginTop: '-80px'}}>your period your way</h1>
          
          <p className="description">Although a period spans only a few days every month, our bodies undergo various hormonal, physical and emotional changes throughout the entire cycle. We noticed that most period trackers focus on what happens during the menstrual phase, but don't take into account what we can do to take care of our bodies in between each period. With dot. we hope to provide catered health and food recommendations and insights throughout the entire menstruation cycle, to help people who menstruate to better understand their bodies and take control of their periods.

</p>
         <Link to="/dashboard"> <button> Get Started </button></Link>

        </div>
      </div>
    );
  }
}

export default Welcome;
