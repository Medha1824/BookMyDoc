import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../LoginSignup.css";
import logo from "../assets/logo.png";
import { Eye, EyeOff } from "lucide-react";

function LogInPatient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/profile`,
          { credentials: "include" },
        );

        if (response.ok) {
          navigate("/patient-home");
        }
      } catch (err) {}
    };

    checkAuth();
  }, [navigate]);

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: email.trim(),
            password,
            role: "patient",
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        const message =
          data.error ||
          (data.errors && data.errors.map((err) => err.msg).join(", ")) ||
          "Login failed";
        setErrors({ form: message });
        return;
      }

      navigate("/patient-home");
    } catch (err) {
      setErrors({ form: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="auth-container">
      <nav>
        <Link to="/">
          <img src={logo} alt="BookMyDoc" className="logo-img" />
        </Link>
        <ul>
          <li>
            <Link to="/about">About Us</Link>
          </li>
        </ul>
      </nav>

      <main className="auth-main">
        <div className="auth-card">
          <h1 className="auth-title">Patient Login</h1>
          {errors.form && <p className="field-error">{errors.form}</p>}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div>
              <input
                type="email"
                placeholder="Email"
                className={errors.email ? "input-error" : ""}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email)
                    setErrors((prev) => ({ ...prev, email: undefined }));
                }}
              />
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            <div>
              <div
                className={`password-field ${errors.password ? "input-error" : ""}`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="field-error">{errors.password}</span>
              )}
            </div>

            <button type="submit" className="auth-submit">
              Log In
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup-patient">Sign Up</Link>
          </p>
        </div>
      </main>

      <footer>&copy; 2026 BookMyDoc. All rights reserved.</footer>
    </div>
  );
}

export default LogInPatient;
