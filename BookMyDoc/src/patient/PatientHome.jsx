import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PatientHome.css";

import profilePic from "../assets/PatientProfilePicture.jpg";
import logo from "../assets/logo.png";

const PatientHome = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If there is no token, user is not logged in
    if (!token) {
      navigate("/login-patient");
      return;
    }

    // Fetch logged-in user's information
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/users/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();

        // Backend returns { user: {...} }
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);

        // If token is invalid/expired, remove it
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login-patient");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login-patient");
  };

  return (
    <div className="patient-profile-container">

      {/* =======================
          NAVBAR
      ======================= */}

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

                  <Link
                    to="/history"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    History
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

            {/* Patient Name */}
            <div className="info-row">
              <span className="label">Patient Name</span>

              <span>
                {loading
                  ? "Loading..."
                  : user
                  ? user.name
                  : "N/A"}
              </span>
            </div>

            {/* Age */}
            <div className="info-row">
              <span className="label">Age</span>

              <span>30</span>
            </div>

            {/* Gender */}
            <div className="info-row">
              <span className="label">Gender</span>

              <span>Male</span>
            </div>

            {/* Contact */}
            <div className="info-row">
              <span className="label">Contact</span>

              <span>0123456789</span>
            </div>

            {/* Blood Group */}
            <div className="info-row">
              <span className="label">Blood Group</span>

              <span>O+</span>
            </div>

            {/* Address */}
            <div className="info-row">
              <span className="label">Address</span>

              <span>
                {loading
                  ? "Loading..."
                  : user
                  ? user.email
                  : "N/A"}
              </span>
            </div>

          </div>
        </div>

      </main>

      {/* =======================
          FOOTER
      ======================= */}

      <footer>
        &copy; 2026 BookMyDoc. All rights reserved.
      </footer>

    </div>
  );
};

export default PatientHome;