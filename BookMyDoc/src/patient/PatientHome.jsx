import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PatientHome.css";
import profilePic from "../assets/PatientProfilePicture.jpg";
import logo from "../assets/logo.png";

const PatientHome = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <div className="patient-profile-container">
      {/* =======================
          NAVBAR
      ======================= */}
      <div className="navbar">
        <nav>
          {/* Logo */}
          <img src={logo} alt="BookMyDoc" className="logo-img" />

          {/* Navigation Links */}
          <ul>
            <li>
              <Link to="/doctors">View Doctor</Link>
            </li>

            <li>
              <Link to="/contact">Contact Us</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            {/* =======================
                PROFILE MENU
            ======================= */}
            <li className="profile-menu-container">
              {/* Profile Image Button */}
              <button
                type="button"
                className="profile-menu-button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                aria-label="Open profile menu"
                aria-expanded={profileMenuOpen}
              >
                <img src={profilePic} alt="Patient Profile" />
              </button>

              {/* =======================
                  PROFILE DRAWER
              ======================= */}
              {profileMenuOpen && (
                <div className="profile-drawer">
                  <Link to="/history" onClick={() => setProfileMenuOpen(false)}>
                    History
                  </Link>

                  <Link
                    to="/edit-profile"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Edit Profile
                  </Link>

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
          PATIENT PROFILE CONTENT
      ======================= */}
      <main className="patient-main">
        <div className="profile-card">
          {/* Profile Image */}
          <div className="profile-picture">
            <img src={profilePic} alt="Patient Profile" />
          </div>

          {/* Profile Details */}
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
      </main>

      {/* =======================
          FOOTER
      ======================= */}
      <footer>&copy; 2026 BookMyDoc. All rights reserved.</footer>
    </div>
  );
};

export default PatientHome;
