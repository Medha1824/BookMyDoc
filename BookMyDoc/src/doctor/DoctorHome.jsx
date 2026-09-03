import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./DoctorHome.css";
import doctorPic from "../assets/doctor.png";
import logo from "../assets/logo.png";

const DoctorHome = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <div className="patient-profile-container">
      {/* =======================
          NAVBAR
      ======================= */}
      <div className="navbar">
        <nav>
          {/* =======================
              LOGO
          ======================= */}
          <img src={logo} alt="BookMyDoc" className="logo-img" />

          {/* =======================
              NAVIGATION LINKS
          ======================= */}
          <ul>
            {/* View Appointment */}
            <li>
              <Link to="/doctor-appointments">View Appointment</Link>
            </li>

            {/* Contact Us */}
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>

            {/* About */}
            <li>
              <Link to="/about">About</Link>
            </li>

            {/* =======================
                PROFILE MENU
            ======================= */}
            <li className="profile-menu-container">
              {/* =======================
                  ROUND PROFILE BUTTON
              ======================= */}
              <button
                type="button"
                className="profile-menu-button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                aria-label="Open profile menu"
                aria-expanded={profileMenuOpen}
              >
                <img src={doctorPic} alt="Doctor Profile" />
              </button>

              {/* =======================
                  PROFILE DRAWER
              ======================= */}
              {profileMenuOpen && (
                <div className="profile-drawer">
                  {/* History */}
                  <Link to="/history" onClick={() => setProfileMenuOpen(false)}>
                    History
                  </Link>
                  {/* Log Out */}
                  <Link to="/" onClick={() => setProfileMenuOpen(false)}>
                    Log Out
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* =======================
          DOCTOR PROFILE CONTENT
      ======================= */}
      <main className="patient-main">
        <div className="profile-card">
          {/* =======================
              DOCTOR PROFILE IMAGE
          ======================= */}
          <div className="profile-picture">
            <img src={doctorPic} alt="Doctor Profile" />
          </div>

          {/* =======================
              DOCTOR DETAILS
          ======================= */}
          <div className="profile-details">
            {/* Doctor Name */}
            <div className="info-row">
              <span className="label">Doctor Name</span>

              <span>Dr. John Doe</span>
            </div>

            {/* Specialization */}
            <div className="info-row">
              <span className="label">Specialization</span>

              <span>Cardiologist</span>
            </div>

            {/* Gender */}
            <div className="info-row">
              <span className="label">Gender</span>

              <span>Female</span>
            </div>

            {/* Contact */}
            <div className="info-row">
              <span className="label">Contact</span>

              <span>0123456789</span>
            </div>

            {/* Hospital */}
            <div className="info-row">
              <span className="label">Hospital</span>

              <span>City Hospital</span>
            </div>
          </div>
        </div>
      </main>

      {/* =======================
          FOOTER
      ======================= */}
      <footer>&copy; 2026 BookMyDoc. All rights reserved.</footer>
    </div>
  );
};

export default DoctorHome;
