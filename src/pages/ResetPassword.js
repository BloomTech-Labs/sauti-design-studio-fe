import React, { useState } from 'react';
import axios from 'axios'
import  {useForm} from 'react-hook-form'
import { useHistory } from "react-router-dom";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer.js';

const ResetPassword = () => { 
  const {handleSubmit, register, errors} = useForm();
  const [loginError, setLoginError] = useState("")
  const history = useHistory();
  
  const onSubmit = values => {
    const username = values.email
    axios.post(`${process.env.REACT_APP_OKTA_DOMAIN}/api/v1/authn/recovery/password`, {username: username, factorType: "EMAIL"})
    .then(res => {
        window.alert('Email sent. Check your email for instructions. You will now be redirected to the login page.')
        history.push('/login')
    })
    .catch(err => {
        console.log(err)
    })
  };
  
  return (
  <>
    <Navbar />
    <div className='loginHero loginHero2'>
      <form className='oktaForm oktaForm2 oktaForm3' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='oktaTitle'>Reset Your Password</h2>
        <p className='oktaSubtitle'>Enter your email below. You will receive an email with instructions to reset your password.</p>
          {loginError.length > 0 ? <span className="oktaError">{loginError}</span> : <></>}
          <span className="inputLabelSpan">
            <label className="inputLabel" htmlFor="email">Email</label>
            <input
              className='oktaLoginInput' id="email" title="Enter an Email" type="text" name="email" placeholder="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} 
            />
           </span>
           {errors.email && <span className="oktaError">Please use a valid email address</span>}
        <input className='oktaSubmit' id="submit" type="submit" value="Reset" />
      </form>
    </div>
    <Footer />
    </>
  );
};
export default ResetPassword;