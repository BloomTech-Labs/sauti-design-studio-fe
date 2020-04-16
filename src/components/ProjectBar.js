import React from "react";

import Breadcrumb from './Breadcrumbs.js';

const ProjectBar = (props) => {
  return (
    <div className="project-bar">
      <div className="breadcrumbs">
        <Breadcrumb />     
      </div>
      
      <div className='project-buttons'>
        {/* window.location.href === process.env.REACT_APP_FE_URL/workflows ?   : <></>*/}
        {/* <button className="cursor" onClick={() => {this.createNode();}}><span className='red'>+</span>Add</button>
        <button className="cursor" onClick={(event) => {this.saveCanvas(event);}}>Save</button>
        <button button className="cursor" onClick={(event) => { this.publishCanvas(event)
            this.props.setSimulationState(this.props.simulate_project);}}>Simulate</button>
        <button className="cursor" onClick={(event) => {this.publishCanvas(event)
           this.props.setSimulationState(this.props.simulate_project);}}><span className='red'>Publish</span></button>     
        <button className="cursor" onClick={() => {this.props.setDeleteState(this.props.delete_project)}}>Delete</button> */}
      </div>

    </div>
  );
};

export default ProjectBar;