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
  const history = useHistory();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const oktaAuth = new OktaAuth({ issuer: issuer });
    oktaAuth.signIn({ username, password })
      .then(res => {
        console.log("okta response: ", res)
        res.user.sessionToken = res.data.sessionToken;
        axios.post(`${process.env.REACT_APP_BE_API_URL}/auth/okta/verify`, res.user)
        .then(res=>{
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('id', res.data.id)
          history.push(`/profile`)
        })
        })
      .catch(err => {
        console.log('Failed to login', err)
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
    <div className='loginHero'>
      <form className='oktaForm' onSubmit={handleSubmit}>
        <h2 className='oktaTitle'>Welcome to Sauti Design Studio</h2>
        <label className='oktaLabel'>
          Username:
          <input
            className='oktaInput' id="username" type="text"
            value={username}
            onChange={handleUsernameChange} />
        </label>
        <label className='oktaLabel'>
          Password:
          <input
           className='oktaInput' id="password" type="password"
            value={password}
            onChange={handlePasswordChange} />
        </label>
        <input className='oktaSubmit' id="submit" type="submit" value="Submit" />
        <p className='oktaSignUp'>Don't have an account?</p>
        <button className="oktaSubmit" onClick={()=>history.push("/register")}>Create one here</button>
      </form>
    </div>
  );
};
export default LoginForm;