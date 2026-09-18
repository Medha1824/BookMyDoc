import React, { useState, useEffect } from "react";
import "./DoctorAppointments.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/appointments/doctor`,
          {
            credentials: "include",
          },
        );

        const data = await response.json();

        if (response.ok) {
          setAppointments(data);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleAccept = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/appointments/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status: "Confirmed",
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setAppointments((currentAppointments) =>
          currentAppointments.map((appointment) =>
            appointment._id === id
              ? { ...appointment, status: "Confirmed" }
              : appointment,
          ),
        );
      } else {
        alert(data.error || "Failed to accept appointment.");
      }
    } catch (error) {
      console.error("Failed to accept appointment:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/appointments/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status: "Cancelled",
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setAppointments((currentAppointments) =>
          currentAppointments.map((appointment) =>
            appointment._id === id
              ? { ...appointment, status: "Cancelled" }
              : appointment,
          ),
        );
      } else {
        alert(data.error || "Failed to reject appointment.");
      }
    } catch (error) {
      console.error("Failed to reject appointment:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "Pending",
  );

  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "Confirmed",
  );
  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "Cancelled",
  );
  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }
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
                <div className="appointment-card" key={appointment._id}>
                  <div className="appointment-card-header">
                    <div>
                      <h3>{appointment.patient.name}</h3>
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
                      onClick={() => handleAccept(appointment._id)}
                    >
                      Accept
                    </button>

                    <button
                      className="reject-button"
                      onClick={() => handleReject(appointment._id)}
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
                <div className="appointment-card" key={appointment._id}>
                  <div className="appointment-card-header">
                    <div>
                      <h3>{appointment.patient.name}</h3>
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
        <section className="appointment-section">
          <div className="appointment-section-header">
            <h2>Rejected Appointments</h2>

            <span className="appointment-count">
              {cancelledAppointments.length}{" "}
              {cancelledAppointments.length === 1
                ? "Appointment"
                : "Appointments"}
            </span>
          </div>

          {cancelledAppointments.length > 0 ? (
            <div className="appointment-grid">
              {cancelledAppointments.map((appointment) => (
                <div className="appointment-card" key={appointment._id}>
                  <div className="appointment-card-header">
                    <div>
                      <h3>{appointment.patient.name}</h3>
                      <span className="status cancelled">Rejected</span>
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
              <h3>No Rejected Appointments</h3>
              <p>There are currently no rejected appointment requests.</p>
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
