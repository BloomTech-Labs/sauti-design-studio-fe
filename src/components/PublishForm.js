import React, { useState } from "react";
import {axiosWithAuth} from "./utils/axiosWithAuth";
import { connect } from "react-redux";

const PublishForm = props => {
  const callbackURL = process.env.REACT_APP_BE_API_URL
    ? `${process.env.REACT_APP_BE_API_URL}/workflows/sim/${props.project_id}`
    : `http://localhost:5000/workflows/sim/${props.project_id}`;
  const [credentials, setCredentials] = useState({
    name: "",
    organization: "",
    email: "",
    title: "",
    implementationCountry: "TZ",
    user_id: props.user_id,
    project_title: props.project_title,
    project_id: props.project_id,
    comments: "",
    callback: callbackURL
  });

  const resetCredentials = () => {
    setCredentials({
      name: "",
      organization: "",
      email: "",
      title: "",
      implementationCountry: "TZ",
      user_id: props.user_id,
      project_id: props.project_id,
      comments: "",
      callback: callbackURL
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

  const closeForm = () => {
    props.setOpen(false);
  } 
  return (
    <div id="container">

      <header className="header">
        <span className="titleSection">
          <i className="fa fa-exclamation-circle fa_custom fa-3x" title="You will receive an email confirming the submission of your app. Please wait for an adminstrator to contact you for further information."></i>
          <h1 id="form-title">Submit app for publication</h1>
        </span>
        <p id="description">Enter the following information to deploy your "{`${credentials.project_title}`}" app</p>
      </header>

      <form onSubmit={submit}>
        <div id="survey-form">
          <div className="form-group">
            <label id="name-label" for="name">Name*</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              value={credentials.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label id="organization-label" for="organization">Organization*</label>
            <input
              type="text"
              name="organization"
              id="organization"
              className="form-control"
              placeholder="Organization name"
              value={credentials.organization}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label id="email-label" for="email">Email*</label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label id="title-label" for="title">Title*</label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              placeholder="Enter your Title"
              value={credentials.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <span>Country*</span>
            <select
              id="dropdown"
              name="implementationCountry"
              className="form-control"
              value={credentials.implementationCountry}
              onChange={handleChange}
              required
            >
              {/* Add more countries as needed according to their country code */}
              <option disabled selected value>
                Select current country
              </option>
              <option value="TZ">TZ</option>
              <option value="KE">KE</option>
              <option value="RW">RW</option>
              <option value="UG">UG</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="comments">Other comments or suggestions</label>
            <textarea
              id="comments"
              class="input-textarea"
              name="comments"
              value={credentials.comments}
              onChange={handleChange}
              placeholder="Enter your comment here..."
            />
          </div>
        </div>
        <div className="buttonContainer">

          <button onClick={closeForm} className="cancel button" type="submit" id="submit">
            Cancel
          </button>

          <button className="submit button" type="submit" id="submit">
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
export default connect(mapStateToProps, {})(PublishForm);
