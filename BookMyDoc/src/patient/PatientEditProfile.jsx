import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./PatientEditProfile.css";
import logo from "../assets/logo.png";

const PatientEditProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    contact: "",
    bloodGroup: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/profile`,
          { credentials: "include" },
        );

        if (!response.ok) {
          navigate("/login-patient");
          return;
        }

        const loggedInUser = await response.json();

        if (!loggedInUser) {
          navigate("/login-patient");
          return;
        }

        setUser(loggedInUser);

        setPreview(loggedInUser.profilePicture?.url || "");

        setProfile({
          name: loggedInUser.name || "",
          email: loggedInUser.email || "",
          age: loggedInUser.age || "",
          gender: loggedInUser.gender || "",
          contact: loggedInUser.contact || "",
          bloodGroup: loggedInUser.bloodGroup || "",
          address: loggedInUser.address || "",
        });
      } catch (err) {
        navigate("/login-patient");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setProfilePicture(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) {
      setErrors({
        form: "User information not found. Please login again.",
      });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/id/${user._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: profile.name.trim(),
            email: profile.email.trim(),
            age: profile.age,
            gender: profile.gender,
            contact: profile.contact.trim(),
            bloodGroup: profile.bloodGroup,
            address: profile.address.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          form: data.error || "Failed to update profile",
        });
        return;
      }

      if (profilePicture) {
        const formData = new FormData();

        formData.append("image", profilePicture);

        const pictureResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${user._id}/profile-picture`,
          {
            method: "PUT",
            credentials: "include",
            body: formData,
          },
        );

        const pictureData = await pictureResponse.json();

        if (!pictureResponse.ok) {
          setErrors({
            form:
              pictureData.message ||
              "Profile information saved, but profile picture upload failed.",
          });
          return;
        }
      }

      navigate("/patient-home");
    } catch (error) {
      console.error(error);

      setErrors({
        form: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="patient-edit-profile-page">
      <nav>
          <Link to="/">
            <img src={logo} alt="BookMyDoc" className="logo-img" />
          </Link>
        <ul>
          <li>
            <Link to="/patient-home">
              Home
            </Link>
          </li>
        </ul>
      </nav>

      <main className="edit-profile-main">
        <div className="edit-profile-header">
          <h1>Edit Patient Profile</h1>
          <p>
            Update your personal information.
          </p>
        </div>

        <form className="edit-profile-card" onSubmit={handleSubmit}>
          {errors.form && <p className="field-error">{errors.form}</p>}

          <div className="form-group">
            <label>Profile Picture</label>

            {preview && (
              <img
                src={preview}
                alt="Profile Preview"
                className="profile-picture-preview"
              />
            )}

            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleProfilePictureChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Patient Name</label>

            <input
              id="name"
              name="name"
              type="text"
              value={profile.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              value={profile.email}
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
                type="text"
                value={profile.age}
                onChange={handleChange}
                placeholder="Enter Age"
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
                placeholder="Enter Gender"
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
            <label htmlFor="bloodGroup">Blood Group</label>

            <select
              id="bloodGroup"
              name="bloodGroup"
              value={profile.bloodGroup}
              onChange={handleChange}
              placeholder="Enter Blood Group"
              required
            >
              <option value="" disabled>
                Select Blood Group
              </option>
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
            <label htmlFor="contact">Contact</label>

            <input
              id="contact"
              name="contact"
              type="tel"
              value={profile.contact}
              onChange={handleChange}
              placeholder="Enter Contact"
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
};

export default PatientEditProfile;
