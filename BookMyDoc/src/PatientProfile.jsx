import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PatientDoctorProfile.css";
import profilePic from "./assets/PatientProfilePicture.jpg";
import logo from "./assets/logo.png";

const PatientProfile = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <div className="patient-profile-container">
      {/* =======================
          NAVBAR
      ======================= */}
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

            {/* =======================
                PROFILE MENU
            ======================= */}
            <li className="profile-menu-container">
              <button
                type="button"
                className="profile-menu-button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                aria-label="Open profile menu"
              >
                <img src={profilePic} alt="Profile" />
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

                  <Link to="/logout" onClick={() => setProfileMenuOpen(false)}>
                    Log Out
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* =======================
          MAIN CONTENT
      ======================= */}
      <main>
        <div className="profile-card">
          {/* =======================
              PROFILE IMAGE
          ======================= */}
          <div className="profile-picture">
            <img src={profilePic} alt="Patient Profile" />
          </div>

          {/* =======================
              PROFILE DETAILS
          ======================= */}
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
      <footer>
        <p>© 2026 BookMyDoc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PatientProfile;
