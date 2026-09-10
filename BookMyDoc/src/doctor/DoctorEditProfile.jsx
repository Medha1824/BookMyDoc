import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DoctorEditProfile.css";

function DoctorEditProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    specialization: "",
    gender: "",
    contact: "",
    hospital: "",
  });

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);

  // Get logged-in doctor information
  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/login-doctor");
      return;
    }

    const loggedInUser = JSON.parse(userData);

    setUser(loggedInUser);

    setProfile({
      name: loggedInUser.name || "",
      email: loggedInUser.email || "",
      specialization:
        Array.isArray(loggedInUser.specialization)
          ? loggedInUser.specialization.join(", ")
          : loggedInUser.specialization || "",
      gender: loggedInUser.gender || "",
      contact: loggedInUser.contact || "",
      hospital: loggedInUser.hospital || "",
    });
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      setErrors({
        form: "User information not found. Please login again.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/id/${user.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: profile.name.trim(),
            email: profile.email.trim(),

            specialization: profile.specialization
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item !== ""),

            gender: profile.gender,
            contact: profile.contact.trim(),
            hospital: profile.hospital.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          form: data.error || "Failed to update profile",
        });
        return;
      }

      // Save latest information in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Go back to doctor home
      navigate("/doctor-home");
    } catch (error) {
      console.error(error);

      setErrors({
        form: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="doctor-edit-profile-page">

      <nav className="doctor-edit-profile-nav">
        <div className="doctor-edit-profile-brand">
          BookMyDoc
        </div>

        <ul>
          <li>
            <Link to="/doctor-home">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/doctor-appointments">
              Appointments
            </Link>
          </li>

          <li>
            <Link to="/history">
              History
            </Link>
          </li>
        </ul>
      </nav>

      <main className="doctor-edit-profile-main">

        <div className="doctor-edit-profile-header">
          <h1>Edit Doctor Profile</h1>

          <p>
            Update your professional and personal information.
          </p>
        </div>

        <form
          className="doctor-edit-profile-card"
          onSubmit={handleSubmit}
        >

          {errors.form && (
            <p className="field-error">
              {errors.form}
            </p>
          )}

          {/* NAME */}
          <div className="doctor-form-group">

            <label htmlFor="name">
              Doctor Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={profile.name}
              onChange={handleChange}
              required
            />

          </div>

          {/* EMAIL */}
          <div className="doctor-form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* SPECIALIZATION */}
          <div className="doctor-form-group">

            <label htmlFor="specialization">
              Specialization
            </label>

            <select
              id="specialization"
              name="specialization"
              value={profile.specialization}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Specialization
              </option>

              <option value="Cardiologist">
                Cardiologist
              </option>

              <option value="Dermatologist">
                Dermatologist
              </option>

              <option value="Neurologist">
                Neurologist
              </option>

              <option value="Orthopedic Specialist">
                Orthopedic Specialist
              </option>

              <option value="Pediatrician">
                Pediatrician
              </option>

              <option value="Psychiatrist">
                Psychiatrist
              </option>

              <option value="Dentist">
                Dentist
              </option>

              <option value="General Physician">
                General Physician
              </option>

              <option value="Surgeon">
                Surgeon
              </option>

            </select>

          </div>

          {/* GENDER */}
          <div className="doctor-form-group">

            <label htmlFor="gender">
              Gender
            </label>

            <select
              id="gender"
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          {/* CONTACT */}
          <div className="doctor-form-group">

            <label htmlFor="contact">
              Contact
            </label>

            <input
              id="contact"
              name="contact"
              type="tel"
              value={profile.contact}
              onChange={handleChange}
              required
            />

          </div>

          {/* HOSPITAL */}
          <div className="doctor-form-group">

            <label htmlFor="hospital">
              Hospital
            </label>

            <input
              id="hospital"
              name="hospital"
              type="text"
              value={profile.hospital}
              onChange={handleChange}
              required
            />

          </div>

          {/* BUTTONS */}
          <div className="doctor-edit-profile-actions">

            <button
              type="button"
              className="doctor-cancel-button"
              onClick={() => navigate("/doctor-home")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="doctor-save-button"
            >
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