import React, { useState } from "react";
import {axiosWithAuth} from "./utils/axiosWithAuth";
import { connect } from "react-redux";


const ContactUs = props => {
  const callbackURL = process.env.REACT_APP_BE_API_URL
    ? `${process.env.REACT_APP_BE_API_URL}/workflows/sim/${props.project_id}`
    : `http://localhost:5000/workflows/sim/${props.project_id}`;
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

    console.log("this is credentials at submission", credentials);
    axiosWithAuth()
      .post(
        `${
          process.env.REACT_APP_BE_API_URL
            ? process.env.REACT_APP_BE_API_URL
            : "http://localhost:5000"
        }/publish/send`,
        credentials
      )
      .then(res => {
        console.log("this is the API response", res);
        if (res.data.status === "success") {
          alert("message Sent");
          resetCredentials();
          props.setOpen(false);
        } else if (Response.data.status === "failure") {
          alert("message failed to send");
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="contact-container">
      <header>
        <h2 className="contact-form-title"> Contact Us</h2>
      </header>
      <form className="contact-form" onSubmit={submit}>        
        <div id="contact-form-group">
          <label id="contact-email-label" for="email">
            Email
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
        </div>
        
        <div class="contact-form-group">
          
          <textarea
            id="comments"
            className="contact-input-area"
            name="comments"
            value={credentials.comments}
            onChange={handleChange}
            placeholder="Type message here..."
          />
        </div>
        <div>
          <button className="contactLink" type="submit" id="submit" >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = state => ({
  user_id: state.user_id,
  project_id: state.project_id,
  project_title: state.project_title
});
export default connect(mapStateToProps, {})(ContactUs);
