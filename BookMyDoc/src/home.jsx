import "./Home.css";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <nav>
        <img src={logo} alt="BookMyDoc" className="logo-img" />
        <ul>
          <li>
            <a href="#about">About Us</a>
          </li>
        </ul>
      </nav>

      <main>
        <h1 className="welcome">Welcome to BookMyDoc</h1>
        <p className="about-text" id="about">
          BookMyDoc is your simple and reliable platform for connecting patients
          with trusted doctors. Whether you're looking for quick appointment
          booking or want to offer your medical expertise to those in need,
          BookMyDoc makes healthcare access easier for everyone, anytime and
          anywhere.
        </p>

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
