import React from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProjectBar from '../components/ProjectBar.js';
import ProjectSpace from "../components/Canvas/main.js";

const AppBuilder = props => {
  const history = useHistory();
  return (
    <div className="app-builder-container">
      <Navbar id='canvas-nav'/>
      <ProjectBar />
      <ProjectSpace props={props} history={history}/>
    </div>
  );
};

export default AppBuilder;
