import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PublishModal from "./PublishModal";
const PublishForm = props => {
  const [credentials, setCredentials] = useState({
    name: "",
    organization: "",
    email: "",
    title: "",
    implementationCountry: "",
    user_id: props.user_id,
    project_id: props.project_id,
    comments: ""
  });

  const resetCredentials = () => {
    setCredentials({
      name: "",
      organization: "",
      email: "",
      title: "",
      implementationCountry: "KE",
      user_id: props.user_id,
      project_id: props.project_id,
      comments: ""
    })
  }

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };


  const submit = e => {
    e.preventDefault();
   
    console.log("this is credentials at submission", credentials)
    axios
      .post(`${process.env.REACT_APP_BE_API_URL ? process.env.REACT_APP_BE_API_URL : 'http://localhost:5000'}/publish/send`, credentials)
      .then(res => {
        console.log("this is the API response", res);
        if (res.data.status === 'success'){
          alert("message Sent")
          resetCredentials()
          props.setOpen(false)
        } else if(Response.data.status === 'failure'){
          alert("message failed to send")
          
        }
      })
      .catch(err => console.log(err));
      
  };
  return (
    <div id="container">
      <header>
        <h1 id="form-title"> Submit app to be published</h1>
        <p id="description">
          Application to have your project deploy to AfricaTalking
        </p>
      </header>
      <form id="survey-form" onSubmit={submit}>
        <div class="form-group">
          <label id="name-label" for="name">
            Name{" "}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            class="form-control"
            placeholder="Enter your name"
            value={credentials.name}
            onChange={handleChange}
            required
          />
        </div>
        <div class="form-group">
          <label id="organization-label" for="organization">
            Organization
          </label>
          <input
            type="text"
            name="organization"
            id="organization"
            class="form-control"
            placeholder="Organization name"
            value={credentials.organization}
            onChange={handleChange}
            required
          />
        </div>
        <div class="form-group">
          <label id="email-label" for="email">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            class="form-control"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div class="form-group">
          <label id="title-label" for="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            class="form-control"
            placeholder="Enter your Title"
            value={credentials.title}
            onChange={handleChange}
            required
          />
        </div>
        <div class="form-group">
          <label>Country</label>
          <select id="dropdown" name="implementationCountry" class="form-control" value={credentials.implementationCountry} onChange={handleChange} required>
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
        <div class="form-group">
          <p>Any comments or suggestions?</p>
          <textarea
            id="comments"
            class="input-textarea"
            name="comments"
            value={credentials.comments}
            onChange={handleChange}
            placeholder="Enter your comments here..."
          />
        </div>
        <div>
          <button className="submit" type="submit" id="submit" >
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
