import React, { useState } from "react";
import "./DoctorAppointments.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const initialAppointments = [
  {
    id: 1,
    patientName: "Ayesha Rahman",
    date: "August 25, 2026",
    time: "10:00 AM",
    consultationType: "Video Consultation",
    status: "pending",
  },
  {
    id: 2,
    patientName: "Rahim Ahmed",
    date: "August 25, 2026",
    time: "12:30 PM",
    consultationType: "Hospital Visit",
    status: "pending",
  },
  {
    id: 3,
    patientName: "Nusrat Jahan",
    date: "August 26, 2026",
    time: "11:30 AM",
    consultationType: "Home Visit",
    status: "confirmed",
  },
];

function DoctorAppointments() {
  const [appointments, setAppointments] = useState(initialAppointments);

  const handleAccept = (id) => {
    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "confirmed" }
          : appointment,
      ),
    );
  };

  const handleReject = (id) => {
    setAppointments((currentAppointments) =>
      currentAppointments.filter((appointment) => appointment.id !== id),
    );
  };

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "pending",
  );

  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "confirmed",
  );
  return (
    <div className="doctor-appointments-page">
      <nav className="doctor-appointments-nav">
        <div className="doctor-appointments-brand">
          <Link to="/">
            <img src={logo} alt="BookMyDoc" className="logo-img" />
          </Link>
        </div>

        <ul>
          <li>
            <Link to="/about">Overview</Link>
          </li>
          <li>
            <Link to="/doctor-home">Dashboard</Link>
          </li>
        </ul>
      </nav>

      <header className="doctor-appointments-header">
        <h1>Appointments</h1>
        <p>View and manage appointment requests from your patients.</p>
      </header>

      <main className="doctor-appointments-content">
        <section className="appointment-section">
          <div className="appointment-section-header">
            <h2>Appointment Requests</h2>

            <span className="appointment-count">
              {pendingAppointments.length}{" "}
              {pendingAppointments.length === 1 ? "Request" : "Requests"}
            </span>
          </div>

          {pendingAppointments.length > 0 ? (
            <div className="appointment-grid">
              {pendingAppointments.map((appointment) => (
                <div className="appointment-card" key={appointment.id}>
                  <div className="appointment-card-header">
                    <div className="patient-avatar">
                      {appointment.patientName.charAt(0)}
                    </div>

                    <div>
                      <h3>{appointment.patientName}</h3>
                      <span className="status pending">Pending</span>
                    </div>
                  </div>

                  <div className="appointment-details">
                    <p>
                      <strong>Date:</strong> {appointment.date}
                    </p>

                    <p>
                      <strong>Time:</strong> {appointment.time}
                    </p>

                    <p>
                      <strong>Consultation:</strong>{" "}
                      {appointment.consultationType}
                    </p>
                  </div>

                  <div className="appointment-actions">
                    <button
                      className="accept-button"
                      onClick={() => handleAccept(appointment.id)}
                    >
                      Accept
                    </button>

                    <button
                      className="reject-button"
                      onClick={() => handleReject(appointment.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-appointments">
              <h3>No Appointment Requests</h3>
              <p>There are currently no pending appointment requests.</p>
            </div>
          )}
        </section>

        <section className="appointment-section confirmed-section">
          <div className="appointment-section-header">
            <h2>Confirmed Appointments</h2>

            <span className="appointment-count">
              {confirmedAppointments.length}{" "}
              {confirmedAppointments.length === 1
                ? "Appointment"
                : "Appointments"}
            </span>
          </div>

          {confirmedAppointments.length > 0 ? (
            <div className="appointment-grid">
              {confirmedAppointments.map((appointment) => (
                <div className="appointment-card" key={appointment.id}>
                  <div className="appointment-card-header">
                    <div className="patient-avatar">
                      {appointment.patientName.charAt(0)}
                    </div>

                    <div>
                      <h3>{appointment.patientName}</h3>
                      <span className="status confirmed">Confirmed</span>
                    </div>
                  </div>

                  <div className="appointment-details">
                    <p>
                      <strong>Date:</strong> {appointment.date}
                    </p>

                    <p>
                      <strong>Time:</strong> {appointment.time}
                    </p>

                    <p>
                      <strong>Consultation:</strong>{" "}
                      {appointment.consultationType}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-appointments">
              <h3>No Confirmed Appointments</h3>
              <p>Accepted appointments will appear here.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="doctor-appointments-footer">
        &copy; 2026 BookMyDoc. All rights reserved.
      </footer>
    </div>
  );
}

export default DoctorAppointments;
