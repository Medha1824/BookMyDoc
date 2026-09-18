import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DoctorEditProfile.css";

function DoctorEditProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    specialization: [],
    gender: "",
    contact: "",
    hospital: "",
  });
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);
  const [specializationOpen, setSpecializationOpen] = useState(false);

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
          navigate("/login-doctor");
          return;
        }

        const loggedInUser = await response.json();

        if (!loggedInUser) {
          navigate("/login-doctor");
          return;
        }

        setUser(loggedInUser);

        setPreview(loggedInUser.profilePicture?.url || "");

        setProfile({
          name: loggedInUser.name || "",
          email: loggedInUser.email || "",
          specialization: Array.isArray(loggedInUser.specialization)
          ? loggedInUser.specialization
          : [],
          gender: loggedInUser.gender || "",
          contact: loggedInUser.contact || "",
          hospital: loggedInUser.hospital || "",
        });
      } catch (err) {
        navigate("/login-doctor");
      }
    };

    fetchProfile();
  }, [navigate]);


const specializationOptions = [
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic Specialist",
  "Pediatrician",
  "Psychiatrist",
  "Dentist",
  "General Physician",
  "Surgeon",
];

const handleSpecializationChange = (specialization) => {
  setProfile((prev) => {
    const alreadySelected =
      prev.specialization.includes(specialization);

    return {
      ...prev,
      specialization: alreadySelected
        ? prev.specialization.filter(
            (item) => item !== specialization
          )
        : [...prev.specialization, specialization],
    };
  });
};



  // Handle input changes
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


  // Submit updated profile
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

          specialization: profile.specialization, 
          
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

      if (profilePicture) {
        const formData = new FormData();

        formData.append("image", profilePicture);

        const pictureResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${user._id}/profile-picture`,
          {
            method: "PUT",
            credentials: "include",
            body: formData,
          }
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
          
          {/* PROFILE PICTURE */}
          <div className="doctor-form-group">
            <label>Profile Picture</label>

            {preview && (
              <img
                src={preview}
                alt="Profile Preview"
                className="doctor-profile-picture-preview"
              />
            )}

            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleProfilePictureChange}
            />
          </div>



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

                <label>
                  Specialization
                </label>

                <div className="specialization-dropdown">

                  {/* Selected values / dropdown button */}
                  <div
                    className="specialization-selected"
                    onClick={() =>
                      setSpecializationOpen(!specializationOpen)
                    }
                  >
                    <span>
                      {profile.specialization.length > 0
                        ? profile.specialization.join(", ")
                        : "Select Specialization"}
                    </span>

                    <span>
                      {specializationOpen ? "▲" : "▼"}
                    </span>
                  </div>

                  {/* Dropdown options */}
                  {specializationOpen && (
                    <div className="specialization-options">

                      {specializationOptions.map((specialization) => (
                        <label
                          key={specialization}
                          className="specialization-option"
                        >
                          <input
                            type="checkbox"
                            checked={profile.specialization.includes(
                              specialization
                            )}
                            onChange={() =>
                              handleSpecializationChange(specialization)
                            }
                          />

                          <span>{specialization}</span>
                        </label>
                      ))}

                    </div>
                  )}

                </div>

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