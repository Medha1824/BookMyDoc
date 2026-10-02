import React, { useEffect, useState } from "react";
import "./DoctorAppointments.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function DoctorAppointmentHistory() {
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
          const completedAppointments = data
            .filter((appointment) => appointment.status === "Completed")
            .sort((a, b) => {
              const dateTimeA = new Date(`${a.date} ${a.time}`);
              const dateTimeB = new Date(`${b.date} ${b.time}`);

              return dateTimeB - dateTimeA;
            });

          setAppointments(completedAppointments);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error("Failed to fetch appointment history:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }

  return (
    <div className="doctor-appointments-page">
      {/* Navigation */}
      <div className="doctor-appointments-nav">
        <div className="doctor-appointments-brand">
          <Link to="/doctor-home">
            <img src={logo} alt="BookMyDoc" />
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
                <div
                  className="appointment-card"
                  key={appointment._id}
                >
                  <div className="appointment-card-header">
                    <div>
                      <h3>
                        {index + 1}. {appointment.patient.name}
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