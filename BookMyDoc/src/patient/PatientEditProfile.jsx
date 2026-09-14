import React from "react"; 
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./PatientEditProfile.css";

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

  /*useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/login-patient");
      return;
    }

    const loggedInUser = JSON.parse(userData);

    setUser(loggedInUser);

    setProfile({
      name: loggedInUser.name || "",
      email: loggedInUser.email || "",
      age: loggedInUser.age || "",
      gender: loggedInUser.gender || "",
      contact: loggedInUser.contact || "",
      bloodGroup: loggedInUser.bloodGroup || "",
      address: loggedInUser.address || "",
    });
  }, [navigate]);

*/


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

  const handleSubmit = async (e) => {
    e.preventDefault();

/*    if (!user?.id) {
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
          body: JSON.stringify({   */


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

            /*...(password
              ? {
                  password: password,
                }
              : {}),*/
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

     // localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/patient-home");
    } catch (error) {
      console.error(error);

      setErrors({
        form: "Something went wrong. Please try again.",
      });
    }
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

        </div>

        <form
          className="edit-profile-card"
          onSubmit={handleSubmit}
        >
          {errors.form && (
            <p className="field-error">
              {errors.form}
            </p>
          )}

          {/* NAME */}
          <div className="form-group">
            <label htmlFor="name">
              Patient Name
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
          <div className="form-group">
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

          {/* AGE + GENDER */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">
                Age
              </label>

              <input
                id="age"
                name="age"
                type="text"
                value={profile.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
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
          </div>

          {/* CONTACT */}
          <div className="form-group">
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

          {/* BLOOD GROUP */}
          <div className="form-group">
            <label htmlFor="bloodGroup">
              Blood Group
            </label>

            <select
              id="bloodGroup"
              name="bloodGroup"
              value={profile.bloodGroup}
              onChange={handleChange}
              required
            >
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

          {/* BUTTONS */}
          <div className="edit-profile-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() =>
                navigate("/patient-home")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-button"
            >
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

export default PatientEditProfile;