import React from "react";
import Navbar from "../components/Navbar";
import ProjectBar from "../components/ProjectBar.js";
import Footer from "../components/Footer.js";

const ShortTutorial = () => {
  return (
    <>
      <Navbar />
      <ProjectBar />
      <div className="tutorial">
        <h1>Short Tutorial</h1>
        <iframe
          src="https://drive.google.com/file/d/14k95oZJWRR5Z7mu1dlkQ-OqfLlKMJZu5/preview"
          width="840"
          height="580"
        ></iframe>
      </div>
      <Footer />
    </>
  );
};

export default ShortTutorial;
