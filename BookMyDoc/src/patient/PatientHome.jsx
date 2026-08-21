import React from "react";
import { Link } from "react-router-dom";
import "../PatientDoctorProfile.css";
import profilePic from "../assets/PatientProfilePicture.jpg";
import logo from "../assets/logo.png";

const PatientHome = () => {
  return (
    <div className="patient-profile-container">
      <div className="navbar">
        <nav>
          <img src={logo} alt="BookMyDoc" className="logo-img" />

          <ul>
            <li>
              <a href="/#doctors">View Doctor</a>
            </li>

            <li>
              <a href="/#contact">Contact Us</a>
            </li>

            <li>
              <a href="/#about">About</a>
            </li>

            <li>
              <Link to="/patient-profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="profile-card">
        <div className="profile-picture">
          <img src={profilePic} alt="Profile" />
        </div>

        <div className="profile-details">
          <div className="info-row">
            <span className="label">Patient Name</span>
            <span>Sameen Irtisam</span>
          </div>

          <div className="info-row">
            <span className="label">Age</span>
            <span>30</span>
          </div>

          <div className="info-row">
            <span className="label">Gender</span>
            <span>Male</span>
          </div>

          <div className="info-row">
            <span className="label">Contact</span>
            <span>0123456789</span>
          </div>

          <div className="info-row">
            <span className="label">Blood Group</span>
            <span>O+</span>
          </div>

          <div className="info-row">
            <span className="label">Address</span>
            <span>123 Main Street, City, Country</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHome;
