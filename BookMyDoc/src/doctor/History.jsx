import React, { useEffect, useState } from "react";
import "./DoctorAppointments.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function DoctorAppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let userRole = "doctor";
        let response = await fetch(
          `${import.meta.env.VITE_API_URL}/appointments/doctor`,
          { credentials: "include" },
        );
        if (response.status === 403) {
          userRole = "patient";
          response = await fetch(
            `${import.meta.env.VITE_API_URL}/appointments/patient`,
            { credentials: "include" },
          );
        }
        if (response.status === 401 || response.status === 403) {
          navigate("/login-patient");
          return;
        }

        const data = await response.json();

        if (response.ok) {
          const completedAppointments = data
            .filter((appointment) => appointment.status === "Completed")
            .sort((a, b) => {
              const dateTimeA = new Date(`${a.date} ${a.time}`);
              const dateTimeB = new Date(`${b.date} ${b.time}`);

              return dateTimeB - dateTimeA;
            });

          setRole(userRole);
          setAppointments(completedAppointments);
        } else {
          setRole(userRole);
          setAppointments([]);
        }
      } catch (error) {
        console.error("Failed to fetch appointment history:", error);
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

  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }

  const homePath = role === "patient" ? "/patient-home" : "/doctor-home";

  return (
    <div className="doctor-appointments-page">
      {/* Navigation */}
      <div className="doctor-appointments-nav">
        <div className="doctor-appointments-brand">
          <Link to={homePath}>
            <img src={logo} alt="BookMyDoc" />
          </Link>
        </div>

        <ul>
          <li>
            <Link to="/about">Overview</Link>
          </li>

          <li>
            <Link to={homePath}>Dashboard</Link>
          </li>
        </ul>
      </div>

      {/* Header */}
      <header className="doctor-appointments-header">
        <h1>Appointment History</h1>
        <p>View your completed appointments.</p>
      </header>

      {/* Main Content */}
      <main className="doctor-appointments-content">
        <section className="appointment-section">
          <div className="appointment-section-header">
            <h2>Completed Appointments</h2>

            <span className="appointment-count">
              {appointments.length}{" "}
              {appointments.length === 1 ? "Appointment" : "Appointments"}
            </span>
          </div>

          {appointments.length > 0 ? (
            <div className="appointment-grid">
              {appointments.map((appointment, index) => (
                <div className="appointment-card" key={appointment._id}>
                  <div className="appointment-card-header">
                    <div>
                      <h3>
                        {index + 1}.{" "}
                        {role === "patient"
                          ? appointment.doctor?.name
                          : appointment.patient?.name}
                      </h3>
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

                    <p>
                      <strong>Status:</strong> {appointment.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-appointments">
              <h3>No Completed Appointments</h3>
              <p>
                You currently have no completed appointments in your history.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="doctor-appointments-footer">
        &copy; 2026 BookMyDoc. All rights reserved.
      </footer>
    </div>
  );
}

export default DoctorAppointmentHistory;
