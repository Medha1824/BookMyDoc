import React from "react";
import { Link } from "react-router-dom";
import "../Home.css";
import { useEffect , useState } from "react";
import "./DoctorList.css";
import logo from "../assets/logo.png";
import doctorImage from "../assets/doctor.png";

const categories = [
  "All Doctors",
  "Diabetes",
  "Pediatrics",
  "Ophthalmology",
  "Cardiology",
  "Dermatology",
];

function DoctorList() {
  const [selectedCategory, setSelectedCategory] = useState("All Doctors");
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);

      try {
        let url = "http://localhost:4000/doctors";

        if (selectedCategory !== "All Doctors") {
          url += `?specialization=${encodeURIComponent(selectedCategory)}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setDoctors(data);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [selectedCategory]);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="doctor-list-page">
      <nav className="doctor-list-nav">
        <div className="doctor-list-brand">
          <Link to="/">
            <img src={logo} alt="BookMyDoc" className="logo-img" />
          </Link>
        </div>

        <ul>
          <li>
            <Link to="/about">Overview</Link>
          </li>
          <li>
            <Link to="/patient-home">Dashboard</Link>
          </li>
        </ul>
      </nav>

      <section className="doctor-list-header">
        <h1>Find Your Doctor</h1>
        <p>
          Choose a medical category and find the right doctor for your needs.
        </p>
      </section>

      <div className="doctor-list-content">
        <aside className="category-sidebar">
          <h2>Categories</h2>
          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>
        <section className="doctors-section">
          <div className="doctor-search">
            <input
              type="text"
              placeholder="Search doctor by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="doctors-section-header">
            <h2>{selectedCategory}</h2>
            <span>
              {filteredDoctors.length}{" "}
              {filteredDoctors.length === 1 ? "Doctor" : "Doctors"}
            </span>
          </div>

          {loading ? (
            <div className="no-doctors">
              <h3>Loading doctors...</h3>
            </div>
          ) : filteredDoctors.length > 0 ? (
            <div className="doctor-grid">
              {filteredDoctors.map((doctor) => (
                <Link
                  to={`/doctor-overview/${doctor._id}`}
                  className="doctor-card"
                  key={doctor._id}
                >
                  <div className="doctor-image-container">
                    <img
                      src={doctorImage}
                      alt={doctor.name}
                      className="doctor-image"
                    />
                  </div>

                  <div className="doctor-card-content">
                    <h3>{doctor.name}</h3>

                    <p className="doctor-specialization">
                      {doctor.specialization.join(", ")}
                    </p>

                    <p className="doctor-experience">Doctor</p>

                    <span className="view-profile-button" type="button">
                      View Profile
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="no-doctors">
              <h3>No doctors found</h3>
              <p>There are currently no doctors available in this category.</p>
            </div>
          )}
        </section>
      </div>

      <footer className="doctor-list-footer">
        &copy; 2026 BookMyDoc. All rights reserved.
      </footer>
    </div>
  );
}

export default DoctorList;
