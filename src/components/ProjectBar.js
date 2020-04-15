import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@material-ui/core";

const ProjectBar = () => {
  return (
    <div className="project bar">
      <div className="breadcrumbs">
        <Breadcrumbs />
        
      </div>
      <div className="navbar-options">
        <Options />
      </div>
    </div>
  );
};