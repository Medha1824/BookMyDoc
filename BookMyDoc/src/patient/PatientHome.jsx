import logo from "../assets/logo.png";
import "../Home.css";

function PatientHome() {
  return (
    <div className="home-container">
      <nav>
        <img src={logo} alt="BookMyDoc" className="logo-img" />
        <ul>
          <li>
            <a href="/#doctors">View Doctor</a>
          </li>
          <li>
            <a href="/#contact">Contact Us</a>
          </li>
          <li>
            <a href="/#about">About</a>
          </li>
        </ul>
      </nav>

      <main className="auth-main"></main>

      <footer>&copy; 2026 BookMyDoc. All rights reserved.</footer>
    </div>
  );
}

export default PatientHome;
