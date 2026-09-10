import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PatientHome.css";
import profilePic from "../assets/PatientProfilePicture.jpg";
import logo from "../assets/logo.png";
import { useEffect } from "react";

const PatientHome = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({});


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login-patient");
    }

    const userData = localStorage.getItem("user");
    const parsedData = JSON.parse(userData);
    setUser(parsedData)

  },[navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login-patient");
  };

  return (
    <div className="patient-profile-container">
      <div className="navbar">
        <nav>
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="BookMyDoc" className="logo-img" />
          </Link>

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

                  <Link to="/patient-edit-profile" onClick={() => setProfileMenuOpen(false)}>
                    Edit Profile
                  </Link>

                  <button
                    className="logout-link"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    Log Out
                  </button>
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

              <span>{user.name}</span>
            </div>

            <div className="info-row">
              <span className="label">Age</span>

              <span>{user.age}</span>
            </div>

            <div className="info-row">
              <span className="label">Gender</span>

              <span>{user.gender}</span>
            </div>

            <div className="info-row">
              <span className="label">Contact</span>

              <span>{user.contact}</span>
            </div>

            <div className="info-row">
              <span className="label">Blood Group</span>

              <span>{user.bloodGroup}</span>
            </div>

            <div className="info-row">
              <span className="label">Email</span>

              <span>{user.email}</span>
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
