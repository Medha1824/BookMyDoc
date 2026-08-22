import React from "react";
import { Link } from "react-router-dom";
import "../PatientDoctorProfile.css";
import doctorPic from "../assets/doctor.png";
import logo from "../assets/logo.png";

const DoctorHome = () => {
  return (
    <div className="patient-profile-container">
      <div className="navbar">
        <nav>
          <img src={logo} alt="BookMyDoc" className="logo-img" />

          <ul>
            <li>
              <Link to="/doctor-appointments">View Appointment</Link>
            </li>

            <li>
              <Link to="/contact">Contact Us</Link>
            </li>

            <li>
              <a href="/#about">About</a>
            </li>

            <li>
              <Link to="/doctor-home">Profile</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="profile-card">
        <div className="profile-picture">
          <img src={doctorPic} alt="Doctor Profile" />
        </div>

        <div className="profile-details">
          <div className="info-row">
            <span className="label">Doctor Name</span>
            <span>Dr. John Doe</span>
          </div>

          <div className="info-row">
            <span className="label">Specialization</span>
            <span>Cardiologist</span>
          </div>

          <div className="info-row">
            <span className="label">Age</span>
            <span>40</span>
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
            <span className="label">Hospital</span>
            <span>City Hospital</span>
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

export default DoctorHome;
