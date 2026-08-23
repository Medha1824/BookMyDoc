import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DoctorEditProfile.css";

function DoctorEditProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    doctorName: "Dr. John Doe",
    specialization: "Cardiologist",
    gender: "Female",
    contact: "0123456789",
    hospital: "City Hospital",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/doctor-home");
  };

  return (
    <div className="doctor-edit-profile-page">
      <nav className="doctor-edit-profile-nav">
        <div className="doctor-edit-profile-brand">BookMyDoc</div>

        <ul>
          <li>
            <Link to="/doctor-home">Dashboard</Link>
          </li>

          <li>
            <Link to="/doctor-appointments">Appointments</Link>
          </li>

          <li>
            <Link to="/history">History</Link>
          </li>
        </ul>
      </nav>

      <main className="doctor-edit-profile-main">
        <div className="doctor-edit-profile-header">
          <h1>Edit Doctor Profile</h1>

          <p>Update your professional and personal information.</p>
        </div>

        <form className="doctor-edit-profile-card" onSubmit={handleSubmit}>
          <div className="doctor-form-group">
            <label htmlFor="doctorName">Doctor Name</label>

            <input
              id="doctorName"
              name="doctorName"
              type="text"
              value={profile.doctorName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="doctor-form-group">
            <label htmlFor="specialization">Specialization</label>

            <select
              id="specialization"
              name="specialization"
              value={profile.specialization}
              onChange={handleChange}
              required
            >
              <option value="">Select Specialization</option>

              <option value="Cardiologist">Cardiologist</option>

              <option value="Dermatologist">Dermatologist</option>

              <option value="Neurologist">Neurologist</option>

              <option value="Orthopedic Specialist">
                Orthopedic Specialist
              </option>

              <option value="Pediatrician">Pediatrician</option>

              <option value="Psychiatrist">Psychiatrist</option>

              <option value="Dentist">Dentist</option>

              <option value="General Physician">General Physician</option>

              <option value="Surgeon">Surgeon</option>
            </select>
          </div>

          <div className="doctor-form-group">
            <label htmlFor="gender">Gender</label>

            <select
              id="gender"
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>

              <option value="Male">Male</option>

              <option value="Female">Female</option>

              <option value="Other">Other</option>
            </select>
          </div>

          <div className="doctor-form-group">
            <label htmlFor="contact">Contact</label>

            <input
              id="contact"
              name="contact"
              type="tel"
              value={profile.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="doctor-form-group">
            <label htmlFor="hospital">Hospital</label>

            <input
              id="hospital"
              name="hospital"
              type="text"
              value={profile.hospital}
              onChange={handleChange}
              required
            />
          </div>

          <div className="doctor-edit-profile-actions">
            <button
              type="button"
              className="doctor-cancel-button"
              onClick={() => navigate("/doctor-home")}
            >
              Cancel
            </button>

            <button type="submit" className="doctor-save-button">
              Save Changes
            </button>
          </div>
        </form>
      </main>

      <footer className="doctor-edit-profile-footer">
        &copy; 2026 BookMyDoc. All rights reserved.
      </footer>
    </div>
  );
}

export default DoctorEditProfile;
