import { useState } from "react";
import "./Contact.css";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, phone, email, subject, message });
  };

  return (
    <div className="home-container">
      <nav>
        <img src={logo} alt="BookMyDoc" className="logo-img" />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>

      <div className="contact-page">
        <div className="contact-header">
          <h1>Connect With Us</h1>
          <p>
            We would love to respond to your queries and help you succeed. Feel
            free to get in touch with us.
          </p>
        </div>

        <div className="contact-box">
          <div className="contact-form-side">
            <h2>Send your request</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Cristiano Ronaldo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="+880 1914864655"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="ronaldo7@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="send-btn">
                SEND
              </button>
            </form>
          </div>

          <div className="contact-info-side">
            <h2>Reach Us</h2>

            <div className="info-row">
              <span className="info-label">Email</span>
              <span className="info-value">contactus@bookmydoc.com</span>
            </div>

            <div className="info-row">
              <span className="info-label">Phone</span>
              <span className="info-value">+880 111 222 33</span>
            </div>

            <div className="info-row">
              <span className="info-label">Address</span>
              <span className="info-value">
                #212, Ground floor
                <br />
                Green Road, Dhaka
                <br />
                Dhaka-1100
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer>&copy; 2026 BookMyDoc. All rights reserved.</footer>
    </div>
  );
}

export default Contact;
