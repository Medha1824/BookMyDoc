import React from 'react'
import "../Home.css";

function DoctorAppointments() {
  return (
     <div className="home-container">
      <nav>
        <h2>BookMyDoc</h2>
      </nav>

      <main>
        <h1 className="welcome">Appointments</h1>

        <p className="about-text">
          Here you can view appointment requests from patients.
        </p>
      </main>

      <footer>&copy; 2026 BookMyDoc. All rights reserved.</footer>
    </div>
  )
}

export default DoctorAppointments