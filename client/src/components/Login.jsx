import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    setIsLoading(true);
    const googleOAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.reproductive_health.read%20profile%20email%20openid&state=%7B%7D&response_type=code&client_id=173285732369-tefattcjqd7j9lmahul2qki4hsgjtbr8.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A1000%2Fcallback";
    navigate("/dashboard", { state: { oauthUrl: googleOAuthUrl } });
  };
  

  useEffect(() => {
    handleGoogleLogin();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <button onClick={handleGoogleLogin}>Login with Google</button>
      )}
    </div>
  );
};

export default Login;