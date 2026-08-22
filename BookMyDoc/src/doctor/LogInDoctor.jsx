import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../LoginSignup.css";
import logo from "../assets/logo.png";

function LoginDoctor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor login:", email, password);
    navigate("/doctor-home");
  };

  return (
    <div className="home-container">
      <nav>
        <img src={logo} alt="BookMyDoc" className="logo-img" />
        <ul>
          <li>
            <a href="/#about">About Us</a>
          </li>
        </ul>
      </nav>

      <main className="auth-main">
        <div className="auth-card">
          <h1 className="auth-title">Doctor Login</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="auth-submit">
              Log In
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup-doctor">Sign Up</Link>
          </p>
        </div>
      </main>

      <footer>&copy; 2026 BookMyDoc. All rights reserved.</footer>
    </div>
  );
}

export default LoginDoctor;
