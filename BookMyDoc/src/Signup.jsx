import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginSignup.css";
import logo from "./assets/logo.png";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup:", name, email, password);
  };

  return (
    <div className="home-container">
      <nav>
        <img src={logo} alt="BookMyDoc" className="logo-img" />
        <ul>
          <li>
            <Link to="/about">About us</Link>
          </li>
        </ul>
      </nav>

      <main className="auth-main">
        <div className="auth-card">
          <h1 className="auth-title">Sign Up</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              Sign Up
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </main>

      <footer>&copy; 2026 BookMyDoc. All rights reserved.</footer>
    </div>
  );
}

export default Signup;
