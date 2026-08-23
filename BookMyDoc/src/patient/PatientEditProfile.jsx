import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PatientEditProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    patientName: "Sameen Irtisam",
    age: "30",
    gender: "Male",
    contact: "0123456789",
    bloodGroup: "O+",
    address: "123 Main Street, City, Country",
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
    navigate("/patient-home");
  };

  return (
    <div className="edit-profile-page">
      <nav className="edit-profile-nav">
        <div className="edit-profile-brand">BookMyDoc</div>

        <ul>
          <li>
            <Link to="/patient-home">Dashboard</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
        </ul>
      </nav>

      <main className="edit-profile-main">
        <div className="edit-profile-header">
          <h1>Edit Profile</h1>
          <p>Update your personal information and keep your profile current.</p>
        </div>

        <form className="edit-profile-card" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patientName">Patient Name</label>
            <input
              id="patientName"
              name="patientName"
              type="text"
              value={profile.patientName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                max="120"
                value={profile.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
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
          </div>

          <div className="form-group">
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

          <div className="form-group">
            <label htmlFor="bloodGroup">Blood Group</label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={profile.bloodGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              rows="4"
              value={profile.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-profile-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/patient-home")}
            >
              Cancel
            </button>

            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </main>

      <footer className="edit-profile-footer">
        &copy; 2026 BookMyDoc. All rights reserved.
      </footer>
    </div>
  );
}

export default EditProfile;
