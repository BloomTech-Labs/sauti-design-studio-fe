import React, { useState } from "react";
import {axiosWithAuth} from "./utils/axiosWithAuth";
import Loader from 'react-loader-spinner'
const ContactUs = props => {
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    email: "",
    comments: ""
  });

  const resetCredentials = () => {
    setCredentials({
        email: "",
        comments: ""
    });
  };

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const submit = e => {
    e.preventDefault();
    setLoading(true)
    if (credentials.comments.trim() !== ""){
      axiosWithAuth()
        .post(
          `${
            process.env.REACT_APP_BE_API_URL
              ? process.env.REACT_APP_BE_API_URL
              : "http://localhost:5000"
          }/publish/contact`,
          credentials
        )
        .then(res => {
          if (res.data.status === "success") {
            alert("message Sent");
            resetCredentials();
            setLoading(false)
          } else if (Response.data.status === "failure") {
            alert("message failed to send");
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="contact-container">
      <header>
        <h2 className="contact-form-title"> Contact Us</h2>
        
      </header>
      <form className="contact-form" onSubmit={submit}>      
          <label id="contact-email-label" htmlFor="email">
            Email address
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="contact-input"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={handleChange}
            required
          />   
        
          <textarea
            id="comments"
            className="contact-input-area"
            name="comments"
            value={credentials.comments}
            onChange={handleChange}
            placeholder="Type message here..."
          />
          <span className="loaderButton">
            {loading && <span><Loader type="TailSpin" color="darkred" height={40} width={40} /></span>}
            <button className="contactLink" type="submit" id="submit" >
              Send
            </button>
          </span>
        
      </form>
    </div>
  );
};

export default ContactUs;
