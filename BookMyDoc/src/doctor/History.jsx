import React from "react";
import "./History.css";
import { Link } from "react-router-dom";

const appointmentHistory = [
  {
    id: 1,
    patientName: "Ayesha Rahman",
    date: "August 25, 2026",
    time: "10:00 AM",
    consultationType: "Video Consultation",
    status: "done",
  },
  {
    id: 2,
    patientName: "Rahim Ahmed",
    date: "August 25, 2026",
    time: "12:30 PM",
    consultationType: "Hospital Visit",
    status: "done",
  },
  {
    id: 3,
    patientName: "Nusrat Jahan",
    date: "August 26, 2026",
    time: "11:30 AM",
    consultationType: "Home Visit",
    status: "done",
  },
];

function History() {
  return (
    <div className="doctor-history-page">
      <nav className="doctor-history-nav">
        <div className="doctor-history-brand">BookMyDoc</div>

        <ul>
          <li>
            <Link to="/about">Overview</Link>
          </li>
          <li>
            <Link to="/doctor-home">Dashboard</Link>
          </li>
        </ul>
      </nav>

      <header className="doctor-history-header">
        <h1>Appointment History</h1>
        <p>View your completed appointments and consultation history.</p>
      </header>

      <main className="doctor-history-content">
        <section className="history-section">
          <div className="history-section-header">
            <h2>Completed Appointments</h2>

            <span className="history-count">
              {appointmentHistory.length}{" "}
              {appointmentHistory.length === 1 ? "Appointment" : "Appointments"}
            </span>
          </div>

          <div className="history-list">
            {appointmentHistory.map((appointment) => (
              <div className="history-card" key={appointment.id}>
                <div className="history-card-header">
                  <div className="patient-avatar">
                    {appointment.patientName.charAt(0)}
                  </div>

                  <div className="patient-heading">
                    <h3>{appointment.patientName}</h3>
                    <span className="history-status">Done</span>
                  </div>
                </div>

                <div className="history-details">
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
        </section>
      </main>

      <footer className="doctor-history-footer">
        &copy; 2026 BookMyDoc. All rights reserved.
      </footer>
    </div>
  );
}

export default History;
