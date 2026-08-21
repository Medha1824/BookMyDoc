import React from "react";
import { Link } from "react-router-dom";
import "../Home.css";
import logo from "../assets/logo.png";

const DoctorHome = () => {
  return (
    <div className="home-container">
      <nav>
        <img src={logo} alt="BookMyDoc" className="logo-img" />

        <ul>
          <li>
            <Link to="/doctor-appointments">View Appointment</Link>
          </li>

          <li>
            <a href="/#contact">Contact Us</a>
          </li>

          <li>
            <a href="/#about">About</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DoctorHome;
