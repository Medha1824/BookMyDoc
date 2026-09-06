import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DoctorHome.css";

import doctorPic from "../assets/doctor.png";
import logo from "../assets/logo.png";

const DoctorHome = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If there is no token, user is not logged in
    if (!token) {
      navigate("/login-doctor");
      return;
    }

    // Fetch logged-in doctor's information
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

        navigate("/login-doctor");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login-doctor");
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

            {/* View Appointment */}
            <li>
              <Link to="/doctor-appointments">
                View Appointment
              </Link>
            </li>

            {/* Contact Us */}
            <li>
              <Link to="/contact">
                Contact Us
              </Link>
            </li>

            {/* About */}
            <li>
              <Link to="/about">
                About
              </Link>
            </li>

            {/* =======================
                PROFILE MENU
            ======================= */}

            <li className="profile-menu-container">

              {/* Round Profile Button */}
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
                  <Link
                    to="/history"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    History
                  </Link>
                  

                  {/* Edit Profile */}
                  <Link
                    to="/doctor-edit-profile"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Edit Profile
                  </Link>

                  {/* Log Out */}
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
              <span className="label">
                Doctor Name
              </span>

              <span>
                {loading
                  ? "Loading..."
                  : user
                  ? user.name
                  : "N/A"}
              </span>
            </div>

            {/* Specialization */}
            <div className="info-row">
              <span className="label">
                Specialization
              </span>

              <span>
                {loading
                  ? "Loading..."
                  : user && user.specialization
                  ? user.specialization.join(", ")
                  : "N/A"}
              </span>
            </div>

            {/* Gender */}
            <div className="info-row">
              <span className="label">
                Gender
              </span>

              <span>Female</span>
            </div>

            {/* Contact */}
            <div className="info-row">
              <span className="label">
                Contact
              </span>

              <span>0123456789</span>
            </div>

            {/* Hospital / Email */}
            <div className="info-row">
              <span className="label">
                Hospital
              </span>

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

export default DoctorHome;