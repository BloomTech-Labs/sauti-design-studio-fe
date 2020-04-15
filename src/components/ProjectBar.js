import React from "react";

import Breadcrumb from './Breadcrumbs.js';

const ProjectBar = () => {
  return (
    <div className="project-bar">
      <div className="breadcrumbs">
        <Breadcrumb />     
      </div>
      
      <div className='project-buttons'>
        {/* if on canvas display buttons, if on project list display:none */}
        <button><span className='red'>+</span>Add</button>
        <button>Save</button>
        <button>View</button>
        <button className='red'>Publish</button>        
        <button>Delete</button>
      </div>

    </div>
  );
};

export default ProjectBar;