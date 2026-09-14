import { useFormik } from "formik";
import * as Yup from "yup";
import "./Contact.css";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";

const ContactSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  phone: Yup.string()
    .matches(/^[0-9+\-\s]{7,20}$/, "Enter a valid phone number")
    .required("Phone is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  subject: Yup.string().trim().required("Subject is required"),
  message: Yup.string().trim().required("Message is required"),
});

function Contact() {
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { resetForm, setStatus, setSubmitting }) => {
      setStatus(null);
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORMS_KEY,
            ...values,
          }),
        });

        const data = await res.json();

        if (data.success) {
          resetForm();
          setStatus({ type: "success", message: "Message sent successfully!" });
        } else {
          setStatus({
            type: "error",
            message: data.message || "Something went wrong. Please try again.",
          });
        }
      } catch (err) {
        setStatus({
          type: "error",
          message:
            "Network error — please check your connection and try again.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formik;

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

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Cristiano Ronaldo"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name && (
                    <span className="field-error">{errors.name}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+880 1914864655"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.phone && errors.phone && (
                    <span className="field-error">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="ronaldo7@gmail.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email && (
                    <span className="field-error">{errors.email}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.subject && errors.subject && (
                    <span className="field-error">{errors.subject}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.message && errors.message && (
                  <span className="field-error">{errors.message}</span>
                )}
              </div>

              {status && (
                <p
                  className={
                    status.type === "success" ? "form-success" : "form-error"
                  }
                >
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                className="send-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "SENDING..." : "SEND"}
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
