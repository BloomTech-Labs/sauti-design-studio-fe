import React from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProjectSpace from "../components/Canvas/main.js";

const AppBuilder = props => {
  const history = useHistory();
  return (
    <div className="app-builder-container">
      <Navbar />
      <ProjectSpace props={props} history={history}/>
    </div>
  );
};

export default AppBuilder;
