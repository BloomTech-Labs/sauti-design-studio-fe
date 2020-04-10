import React, { useState } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios'
import { useHistory } from "react-router-dom";

const LoginForm = ({ issuer }) => { 
  const { authService } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const oktaAuth = new OktaAuth({ issuer: issuer });
    oktaAuth.signIn({ username, password })
      .then(res => {
        axios.post(`${process.env.REACT_APP_BE_API_URL}/auth/okta/verify`, res.user)
        .then(async res=>{
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('id', res.data.id)
          history.push(`/profile`)
        })
        })
      .catch(err => {
        console.log('Failed to login', err)
        setError(true)
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
    authService.redirect({ sessionToken });
    return null;
  }


  return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            id="username" type="text"
            value={username}
            onChange={handleUsernameChange} />
        </label>
        <label>
          Password:
          <input
            id="password" type="password"
            value={password}
            onChange={handlePasswordChange} />
        </label>
        <input id="submit" type="submit" value="Submit" />
      </form>
  );
};
export default LoginForm;