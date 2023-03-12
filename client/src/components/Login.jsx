import React from "react";
import {Link} from 'react-router-dom'

class Login extends React.Component {


    state = {
        redirectToHome: false,
    };



    componentDidMount() {
        // Handle the Google OAuth process here
        const googleOAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.reproductive_health.read%20profile%20email%20openid&state=%7B%7D&response_type=code&client_id=173285732369-tefattcjqd7j9lmahul2qki4hsgjtbr8.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A1000%2Fdata";
        window.location.href = googleOAuthUrl;
        const urlParams = new URLSearchParams(window.location.search);
        // if code response is good then redirect otherwise login 
        const code = urlParams.get("code");
        console.log(code)
    
    }

    render() {
        if (this.state.redirectToHome) {
            return <Link to="/" />;
        }

        // Render a loading spinner or message here while the OAuth process is ongoing
        return <div>Loading...</div>;
    }

}





export default Login;