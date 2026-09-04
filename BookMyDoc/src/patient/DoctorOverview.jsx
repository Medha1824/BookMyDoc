import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./DoctorOverview.css";
import logo from "../assets/logo.png";
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

function DoctorOverview() {
  const { id } = useParams();

  const selectedDoctor = doctors.find((doctor) => doctor.id === Number(id));

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
              src={selectedDoctor.image}
              alt={selectedDoctor.name}
              className="overview-doctor-image"
            />
          </div>

          <div className="doctor-profile-info">
            <span className="overview-category">{selectedDoctor.category}</span>

            <h1>{selectedDoctor.name}</h1>

            <h2>{selectedDoctor.specialization}</h2>

            <p>
              <strong>Experience:</strong> {selectedDoctor.experience}
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
