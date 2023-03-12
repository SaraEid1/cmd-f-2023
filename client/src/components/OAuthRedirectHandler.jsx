// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const OAuthRedirectHandler = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Get the authorization code from the query string
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get("code");

//     if (code) {
//       // Exchange the authorization code for an access token
//       fetch(`http://localhost:3000/exchange_code?code=${code}`)
//         .then((response) => response.json())
//         .then((data) => {
//           // Save the access token to local storage or a cookie
//           localStorage.setItem("access_token", data.access_token);

//           // Set loading to false and navigate to the dashboard
//           navigate("/dashboard");
//         })
//         .catch((error) => console.error(error));
//     }
//   }, [navigate]);

//   return <div>Loading...</div>;
// };

// export default OAuthRedirectHandler;