import React, { useEffect, useState } from "react";
import "./DoctorAppointments.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function DoctorDailySchedule() {
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
          const confirmedAppointments = data
            .filter((appointment) => appointment.status === "Confirmed")
            .sort((a, b) => {
              const dateTimeA = new Date(`${a.date} ${a.time}`);
              const dateTimeB = new Date(`${b.date} ${b.time}`);

              return dateTimeA - dateTimeB;
            });

          setAppointments(confirmedAppointments);
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

  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }

  return (
    <div className="doctor-appointments-page">
      <div className="doctor-appointments-nav">
        <div className="doctor-appointments-brand">
          <Link to="/doctor-home">
            <img src={logo} alt="BookMyDoc" />
          </Link>
        </div>

        <ul>
          <li>
            <Link to="/doctor-appointments">View Appointment</Link>
          </li>

          <li>
            <Link to="/doctor-daily-schedule">Daily Schedule</Link>
          </li>

          <li>
            <Link to="/contact">Contact Us</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>

      <header className="doctor-appointments-header">
        <h1>Daily Schedule</h1>
        <p>View your confirmed appointments for the day.</p>
      </header>

      <main className="doctor-appointments-content">
        <section className="appointment-section">
          <div className="appointment-section-header">
            <h2>Confirmed Appointments</h2>

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
                  </div>

                  <div className="appointment-actions">
                    <button className="accept-button">Complete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-appointments">
              <h3>No Confirmed Appointments</h3>
              <p>
                You currently have no confirmed appointments in your schedule.
              </p>
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

export default DoctorDailySchedule;
