import "./About.css";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";
import {
  Search,
  Building2,
  Video,
  HousePlus,
  Activity,
  LayoutDashboard,
  PhoneOff,
  Eye,
  Layers,
} from "lucide-react";

function About() {
  return (
    <div className="home-container">
      <nav>
        <Link to="/">
          <img src={logo} alt="BookMyDoc" className="logo-img" />
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>

      <main className="about-page">
        <section className="about-section intro-section">
          <h1 className="about-heading">About BookMyDoc</h1>
          <p className="about-intro">
            BookMyDoc is a digital healthcare platform that replaces the hassle
            of manual and phone-based appointment booking with a simple,
            reliable online experience. It brings patients and doctors together
            on one platform, making healthcare access easier for everyone,
            anytime and anywhere.
          </p>
        </section>

        <section className="about-section mission-section">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-text">
            Our mission is to make healthcare access simpler by connecting
            patients and doctors digitally — saving time for both sides, cutting
            out unnecessary calls and waiting, and making every appointment easy
            to book, track, and manage.
          </p>
        </section>

        <section className="about-section offer-section">
          <h2 className="section-title">What We Offer</h2>
          <div className="offer-grid">
            <div className="offer-card">
              <Search size={32} strokeWidth={1.5} />
              <h3>Doctor Search</h3>
              <p>Easily search and browse doctor profiles by specialty.</p>
            </div>

            <div className="offer-card">
              <div className="offer-icon-group">
                <Building2 size={22} strokeWidth={1.5} />
                <HousePlus size={22} strokeWidth={1.5} />
                <Video size={22} strokeWidth={1.5} />
              </div>
              <h3>Flexible Consultations</h3>
              <p>Choose hospital visit, home visit, or video consultation.</p>
            </div>

            <div className="offer-card">
              <Activity size={32} strokeWidth={1.5} />
              <h3>Real-Time Tracking</h3>
              <p>Track your appointment status live, from booking to visit.</p>
            </div>

            <div className="offer-card">
              <LayoutDashboard size={32} strokeWidth={1.5} />
              <h3>Simple Dashboards</h3>
              <p>
                Clear, easy-to-use dashboards for both patients and doctors.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section why-section">
          <h2 className="section-title">Why BookMyDoc</h2>
          <div className="why-list">
            <div className="why-item">
              <PhoneOff size={26} strokeWidth={1.5} />
              <p>No more waiting on calls</p>
            </div>
            <div className="why-item">
              <Eye size={26} strokeWidth={1.5} />
              <p>Transparent appointment status</p>
            </div>
            <div className="why-item">
              <Layers size={26} strokeWidth={1.5} />
              <p>One platform for both patients and doctors</p>
            </div>
          </div>
        </section>
      </main>

      <footer>&copy; 2026 BookMyDoc. All rights reserved.</footer>
    </div>
  );
}

export default About;
