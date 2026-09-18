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
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/profile`,
          { credentials: "include" },
        );

        if (!response.ok) {
          navigate("/login-doctor");
          return;
        }
        /*
        const data = await response.json();
        setUser(data);
*/
        const data = await response.json();

        if (!data) {
          navigate("/login-doctor"); // or /login-patient
          return;
        }

        setUser(data);
      } catch (err) {
        navigate("/login-doctor");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {}
    navigate("/login-doctor");
  };

  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="patient-profile-container">
      <div className="navbar">
        <nav>
          <Link to="/doctor-home">
            <img src={logo} alt="BookMyDoc" className="logo-img" />
          </Link>

          <ul>
            <li>
              <Link to="/doctor-appointments">View Appointment</Link>
            </li>
            <li>
              <Link to="/doctor-daily-schedule">Daily Schedule</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li className="profile-menu-container">
              <button
                type="button"
                className="profile-menu-button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                aria-label="Open profile menu"
                aria-expanded={profileMenuOpen}
              >
                <img src={doctorPic} alt="Doctor Profile" />
              </button>

              {profileMenuOpen && (
                <div className="profile-drawer">
                  <Link to="/history" onClick={() => setProfileMenuOpen(false)}>
                    History
                  </Link>

                  <Link
                    to="/doctor-edit-profile"
                    onClick={() => setProfileMenuOpen(false)}
                  >
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

      <main className="patient-main">
        <div className="profile-card">
          <div className="profile-picture">
            <img src={doctorPic} alt="Doctor Profile" />
          </div>

          <div className="profile-details">
            <div className="info-row">
              <span className="label">Doctor Name</span>
              <span>{user.name}</span>
            </div>

            <div className="info-row">
              <span className="label">Specialization</span>
              <span>
                {Array.isArray(user.specialization)
                  ? user.specialization.join(" • ")
                  : user.specialization}
              </span>
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
              <span className="label">Hospital</span>
              <span>{user.hospital}</span>
            </div>
          </div>
        </div>
      </main>

      <footer>&copy; 2026 BookMyDoc. All rights reserved.</footer>
    </div>
  );
};

export default DoctorHome;
