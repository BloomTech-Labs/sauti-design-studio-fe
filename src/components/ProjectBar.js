import React from "react";

import Breadcrumb from './Breadcrumbs.js';

const ProjectBar = (props) => {
  return (
    <div className="project-bar">
      <div className="breadcrumbs">
        <Breadcrumb />     
      </div>
      
      <div className='project-buttons'>
        
      </div>

    </div>
  );
};

export default ProjectBar;