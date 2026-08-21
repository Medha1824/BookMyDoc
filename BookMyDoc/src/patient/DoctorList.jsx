import React from "react";
import { Link } from "react-router-dom";
import "../Home.css";
import { useState } from "react";
import "./DoctorList.css";
import doctor from "../assets/doctor.png";
const doctors = [
  {
    id: 1,
    name: "Dr. Ahmed Rahman",
    category: "Diabetes",
    specialization: "Diabetologist",
    experience: "10 Years Experience",
    image: doctor,
  },
  {
    id: 2,
    name: "Dr. Nusrat Jahan",
    category: "Diabetes",
    specialization: "Endocrinologist",
    experience: "8 Years Experience",
    image: doctor,
  },
  {
    id: 3,
    name: "Dr. Farhan Karim",
    category: "Pediatrics",
    specialization: "Pediatrician",
    experience: "12 Years Experience",
    image: doctor,
  },
  {
    id: 4,
    name: "Dr. Sadia Islam",
    category: "Pediatrics",
    specialization: "Child Specialist",
    experience: "7 Years Experience",
    image: doctor,
  },
];

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
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesCategory =
      selectedCategory === "All Doctors" ||
      doctor.category === selectedCategory;

    const matchesSearch = doctor.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });
  return (
    <div className="doctor-list-page">
      <nav className="doctor-list-nav">
        <div className="doctor-list-brand">BookMyDoc</div>

        <ul>
          <li>
            <Link to="/">Home</Link>
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
              placeholder="Search doctor by name..."
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

          {filteredDoctors.length > 0 ? (
            <div className="doctor-grid">
              {filteredDoctors.map((doctor) => (
                <div className="doctor-card" key={doctor.id}>
                  <div className="doctor-image-container">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="doctor-image"
                    />
                  </div>

                  <div className="doctor-card-content">
                    <h3>{doctor.name}</h3>

                    <p className="doctor-specialization">
                      {doctor.specialization}
                    </p>

                    <p className="doctor-experience">{doctor.experience}</p>

                    <button className="view-profile-button" type="button">
                      View Profile
                    </button>
                  </div>
                </div>
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
