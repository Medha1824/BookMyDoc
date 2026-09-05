import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./DoctorOverview.css";
import logo from "../assets/logo.png";
import doctorImage from "../assets/doctor.png";

function DoctorOverview() {
  const { id } = useParams();

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:4000/doctors/${id}`);
        const data = await response.json();

        if (response.ok) {
          setSelectedDoctor(data);
        } else {
          setSelectedDoctor(null);
        }
      } catch (error) {
        console.error("Failed to fetch doctor:", error);
        setSelectedDoctor(null);
      }
    };

    fetchDoctor();
  }, [id]);

  const [showBooking, setShowBooking] = useState(false);
  const [consultationType, setConsultationType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];
  if (!selectedDoctor) {
    return (
      <div className="doctor-overview-page">
        <h1>Doctor Not Found</h1>
        <Link to="/doctors">Back to Doctors</Link>
      </div>
    );
  }

  const handleRequest = (e) => {
    e.preventDefault();

    if (!consultationType || !selectedDate || !selectedTime) {
      alert("Please select consultation type, date and time.");
      return;
    }

    setRequestSent(true);
  };

  return (
    <div className="doctor-overview-page">
      <nav className="doctor-overview-nav">
        <div className="overview-brand">
          <Link to="/">
            <img src={logo} alt="BookMyDoc" className="logo-img" />
          </Link>
        </div>
        <ul>
          <li>
            <Link to="/doctors">Back to Doctors</Link>
          </li>

          <li>
            <Link to="/patient-home">Dashboard</Link>
          </li>
        </ul>
      </nav>

      <main className="doctor-overview-main">
        <section className="doctor-profile-card">
          <div className="overview-image-container">
            <img
              src={doctorImage}
              alt={selectedDoctor.name}
              className="overview-doctor-image"
            />
          </div>

          <div className="doctor-profile-info">
            <span className="overview-category">
              {selectedDoctor.specialization.join(", ")}
            </span>

            <h1>{selectedDoctor.name}</h1>

            <h2>{selectedDoctor.specialization.join(", ")}</h2>

            <p>
              <strong>Experience:</strong> {"10 Years"}
            </p>

            <p>
              <strong>Qualification:</strong> MBBS, MD
            </p>

            <p>
              <strong>Hospital:</strong> City Medical Center
            </p>

            <p className="doctor-description">
              Experienced medical professional providing quality healthcare and
              consultation to patients.
            </p>

            <button
              className="book-button"
              onClick={() => {
                setShowBooking(!showBooking);
                setRequestSent(false);
              }}
            >
              {showBooking ? "Close Booking" : "Book Your Appointment"}
            </button>
          </div>
        </section>

        {showBooking && (
          <section className="booking-section">
            <h2>Book Your Appointment</h2>

            {requestSent ? (
              <div className="request-success">
                <h3>Appointment Request Sent!</h3>

                <p>Your appointment request has been submitted successfully.</p>

                <p>Doctor: {selectedDoctor.name}</p>

                <p>Consultation: {consultationType}</p>

                <p>Date: {selectedDate}</p>

                <p>Time: {selectedTime}</p>
              </div>
            ) : (
              <form className="booking-form" onSubmit={handleRequest}>
                {/* Consultation Type */}

                <div className="booking-group">
                  <label>Choose Consultation Type</label>

                  <div className="consultation-options">
                    <button
                      type="button"
                      className={
                        consultationType === "Home Visit"
                          ? "consultation-option active"
                          : "consultation-option"
                      }
                      onClick={() => setConsultationType("Home Visit")}
                    >
                      Home Visit
                    </button>

                    <button
                      type="button"
                      className={
                        consultationType === "Hospital Visit"
                          ? "consultation-option active"
                          : "consultation-option"
                      }
                      onClick={() => setConsultationType("Hospital Visit")}
                    >
                      Hospital Visit
                    </button>

                    <button
                      type="button"
                      className={
                        consultationType === "Video Consultation"
                          ? "consultation-option active"
                          : "consultation-option"
                      }
                      onClick={() => setConsultationType("Video Consultation")}
                    >
                      Video Consultation
                    </button>
                  </div>
                </div>

                <div className="booking-group">
                  <label htmlFor="appointment-date">Select Date</label>

                  <input
                    id="appointment-date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <div className="booking-group">
                  <label>Select Time Slot</label>

                  <div className="time-slots">
                    {timeSlots.map((time) => (
                      <button
                        type="button"
                        key={time}
                        className={
                          selectedTime === time
                            ? "time-slot active"
                            : "time-slot"
                        }
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="request-button">
                  Request Appointment
                </button>
              </form>
            )}
          </section>
        )}
      </main>

      <footer className="doctor-overview-footer">
        &copy; 2026 BookMyDoc. All rights reserved.
      </footer>
    </div>
  );
}

export default DoctorOverview;
