import React from "react";
import { Link } from "react-router-dom";


import Navbar from "../components/Navbar";
import HomeVideo from "../components/HomeVideo";
import ContactUs from "../components/ContactUs";
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-header">
        <div className='header-container'>
          <div className="header-content">
            <h1>Design Your Own Text-Based App</h1>
            <p>Take your ideas where they need to go.</p>
          </div>  
          <Link className='signUpLink' to ="/login">Start your app</Link>
        </div>
      </div>

      <div className="home-container">
        <div className="home-content">
          <p><span>Sauti Studio + Design</span> allows anyone to build their own text-based apps. Promote your business or share information using your own response flow.</p>
        </div>

        <div className="mission">
          <h1>
            Our mission is to empower people to strengthen their communities and quickly communicate their innovations.
          </h1>
        </div>
      </div>

      <div className="video-container">
        <HomeVideo/>
      </div>

      <div className="contact">
        <ContactUs/>
      </div>

      <footer className="footer">
        <Footer />
      </footer>


    </>
  )
}

export default Home;
