import React from "react";
import React from "react";
import Options from "./NavOptions.js";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-title-box">
        <h2 className="nav-title-content">
          <Link to="/">SAUTI.</Link>
        </h2>
        <p>Studio + Design</p>
      </div>
      <div className="navbar-options">
        <Options />
      </div>
    </div>
  );
};

export default Navbar;

