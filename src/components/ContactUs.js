import React, { useState } from "react";
import {axiosWithAuth} from "./utils/axiosWithAuth";

const ContactUs = props => {
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
          <label id="contact-email-label" for="email">
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
      
          <button className="contactLink" type="submit" id="submit" >
            Send
          </button>
        
      </form>
    </div>
  );
};

export default ContactUs;
