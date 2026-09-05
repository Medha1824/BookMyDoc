import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../LoginSignup.css";
import logo from "../assets/logo.png";

function DoctorSpecialization() {
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const specializations = [
    "Diabetes",
    "Pediatrics",
    "Ophthalmology",
    "Cardiology",
    "Dermatology",
  ];

  const handleCheckboxChange = (specialization) => {
    setSelectedSpecializations((current) => {
      if (current.includes(specialization)) {
        return current.filter((item) => item !== specialization);
      }

      return [...current, specialization];
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedSpecializations.length === 0) {
      setError("Please select at least one specialization");
      return;
    }

    const email = location.state?.email;

    if (!email) {
      setError("Doctor email not found. Please sign up again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/users/doctor-specialization/${encodeURIComponent(email)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            specialization: selectedSpecializations,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save specialization");
        return;
      }

      navigate("/login-doctor");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <nav>
        <Link to="/">
          <img src={logo} alt="BookMyDoc" className="logo-img" />
        </Link>

        <ul>
          <li>
            <Link to="/about">About Us</Link>
          </li>
        </ul>
      </nav>

      <main className="auth-main">
        <div className="auth-card specialization-card">
          <h1 className="auth-title">Select Specialization</h1>

          <p className="specialization-description">
            Select all specializations that apply to you.
          </p>

          <form
            className="specialization-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="specialization-options">
              {specializations.map((specialization) => (
                <label
                  key={specialization}
                  className={`specialization-option ${
                    selectedSpecializations.includes(specialization)
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedSpecializations.includes(specialization)}
                    onChange={() => handleCheckboxChange(specialization)}
                  />

                  <span className="custom-checkbox"></span>

                  <span className="specialization-name">{specialization}</span>
                </label>
              ))}
            </div>

            {error && <span className="field-error">{error}</span>}

            <button type="submit" className="auth-submit">
              Continue
            </button>
          </form>
        </div>
      </main>

      <footer>&copy; 2026 BookMyDoc. All rights reserved.</footer>
    </div>
  );
}

export default DoctorSpecialization;
