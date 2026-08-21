import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import logo from "./assets/logo.png";
import "./Home.css";
import "./LoginSignup.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // "doctor" | "patient"
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select whether you're logging in as a Doctor or Patient.");
      return;
    }

    console.log("Login:", email, password, role);

    if (role === "doctor") {
      navigate("/doctor-home");
    } else {
      navigate("/patient-home");
    }
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
          <h1 className="auth-title">Login</h1>

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

            {/* Role Selection */}
            <div className="role-select">
              <label
                className={`role-option ${role === "patient" ? "role-option--active" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={role === "patient"}
                  onChange={() => setRole(role === "patient" ? "" : "patient")}
                />
                <span className="role-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12l4.5 4.5L19 7"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Login as Patient
              </label>

              <label
                className={`role-option ${role === "doctor" ? "role-option--active" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={role === "doctor"}
                  onChange={() => setRole(role === "doctor" ? "" : "doctor")}
                />
                <span className="role-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12l4.5 4.5L19 7"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Login as Doctor
              </label>
            </div>

            <button type="submit" className="auth-submit">
              Log In
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </main>

      <footer>&copy; 2026 BookMyDoc. All rights reserved.</footer>
    </div>
  );
}

export default Login;
