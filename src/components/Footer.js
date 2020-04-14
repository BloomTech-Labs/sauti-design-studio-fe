import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <a href = '#'>Terms and Conditions </a>
        <a href = '#'>Company Information </a>
        <a href = '#'>© 2019<span className='red'>Sauti Africa Limited</span></a>
        <a href = '#' className='white'>All Rights Reserved</a>
      </div>
      <div className="icons">
        {/* get social media icons */}
      </div>
    </div>
  );
};

export default Footer;