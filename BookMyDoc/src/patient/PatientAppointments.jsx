import React, { useEffect, useState } from "react";
import "../doctor/DoctorAppointments.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/appointments/patient`,
          { credentials: "include" },
        );

        if (response.status === 401) {
          navigate("/login-patient");
          return;
        }

        if (response.status === 403) {
          navigate("/doctor-home");
          return;
        }

        const data = await response.json();
        setAppointments(response.ok ? data : []);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        navigate("/login-patient");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

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
          <Link to="/patient-home">
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

      <header className="doctor-appointments-header">
        <h1>Appointments</h1>
        <p>View your appointment requests and bookings.</p>
      </header>

      <main className="doctor-appointments-content">
        <section className="appointment-section">
          <div className="appointment-section-header">
            <h2>Pending Appointments</h2>

            <span className="appointment-count">
              {pendingAppointments.length}{" "}
              {pendingAppointments.length === 1
                ? "Appointment"
                : "Appointments"}
            </span>
          </div>

          {pendingAppointments.length > 0 ? (
            <div className="appointment-grid">
              {pendingAppointments.map((appointment) => (
                <div className="appointment-card" key={appointment._id}>
                  <div className="appointment-card-header">
                    <div>
                      <h3>{appointment.doctor.name}</h3>

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
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-appointments">
              <h3>No Pending Appointments</h3>
              <p>You currently have no pending appointment requests.</p>
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
                      <h3>{appointment.doctor.name}</h3>

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
              <p>Your confirmed appointments will appear here.</p>
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
                      <h3>{appointment.doctor.name}</h3>

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
              <p>Your rejected appointment requests will appear here.</p>
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

export default PatientAppointments;
