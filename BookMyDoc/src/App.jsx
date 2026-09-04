import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./home";
import Contact from "./Contact";
import About from "./About";

import LoginDoctor from "./doctor/LogInDoctor";
import LoginPatient from "./patient/LogInPatient";
import SignupDoctor from "./doctor/SignupDoctor";
import SignupPatient from "./patient/SignupPatient";

import DoctorHome from "./doctor/DoctorHome";
import PatientHome from "./patient/PatientHome";
import History from "./doctor/History";
import DoctorEditProfile from "./doctor/DoctorEditProfile";

import PatientProfile from "./PatientProfile";

import DoctorList from "./patient/DoctorList";
import DoctorAppointments from "./doctor/DoctorAppointments";
import DoctorOverview from "./patient/DoctorOverview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login-doctor" element={<LoginDoctor />} />
        <Route path="/login-patient" element={<LoginPatient />} />
        <Route path="/signup-doctor" element={<SignupDoctor />} />
        <Route path="/signup-patient" element={<SignupPatient />} />

        <Route path="/doctor-home" element={<DoctorHome />} />
        <Route path="/patient-home" element={<PatientHome />} />

        <Route path="/patient-profile" element={<PatientProfile />} />
        <Route path="/history" element={<History />} />
        <Route path="/doctor-edit-profile" element={<DoctorEditProfile />} />

        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
        <Route path="/doctor-overview/:id" element={<DoctorOverview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
