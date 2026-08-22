import "./Home.css";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";
import { HousePlus, Building2, Video, HeartPulse } from "lucide-react";
import mentalTherapyIcon from "./assets/mental-therapy.svg";

function Home() {
  return (
    <div className="home-container">
      <nav>
        <img src={logo} alt="BookMyDoc" className="logo-img" />
        <ul>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>

      <main>
        <div className="hero-banner">
          <img
            src={mentalTherapyIcon}
            alt="Mental therapy illustration"
            className="hero-icon"
          />
          <h2 className="hero-title">Healthcare At Home Services</h2>
          <p className="hero-subtitle">
            Quality home services that cover all, in terms of your family's well
            being.
          </p>
        </div>

        <h1 className="welcome">Welcome to BookMyDoc</h1>
        <p className="about-text" id="about">
          BookMyDoc is your simple and reliable platform for connecting patients
          with trusted doctors. Whether you're looking for quick appointment
          booking or want to offer your medical expertise to those in need,
          BookMyDoc makes healthcare access easier for everyone, anytime and
          anywhere.
        </p>

        <div className="services">
          <div className="service-card">
            <div className="service-icon">
              <HousePlus size={40} strokeWidth={1.5} />
            </div>
            <div className="service-text">
              <h3>Doctor Home Visit</h3>
              <p>Video visit or home visit in special circumstances.</p>
            </div>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <Building2 size={40} strokeWidth={1.5} />
            </div>
            <div className="service-text">
              <h3>Hospital Visit</h3>
              <p>
                Book an in-person visit and get seen at a hospital near you.
              </p>
            </div>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <Video size={40} strokeWidth={1.5} />
            </div>
            <div className="service-text">
              <h3>Video Consultancy</h3>
              <p>
                Consult with a doctor from anywhere through a live video call.
              </p>
            </div>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <HeartPulse size={40} strokeWidth={1.5} />
            </div>
            <div className="service-text">
              <h3>Online Health Care</h3>
              <p>
                Trained nurses or caregivers at home for patients who need
                special care.
              </p>
            </div>
          </div>
        </div>

        <div className="options">
          <div className="option-card">
            <h2>Become a Doctor</h2>
            <p>
              Join our platform to connect with patients and manage your
              appointments with ease.
            </p>
            <Link to="/login">
              <button type="button">Get Started</button>
            </Link>
          </div>

          <div className="option-card">
            <h2>Become a Patient</h2>
            <p>
              Find and book appointments with trusted doctors near you in just a
              few clicks.
            </p>
            <Link to="/login">
              <button type="button">Get Started</button>
            </Link>
          </div>
        </div>
      </main>

      <footer>&copy; 2026 BookMyDoc. All rights reserved.</footer>
    </div>
  );
}

export default Home;
