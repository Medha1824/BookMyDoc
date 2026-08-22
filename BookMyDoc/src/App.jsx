import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Contact from "./Contact";
import About from "./About";

import DoctorHome from "./doctor/DoctorHome";
import PatientHome from "./patient/PatientHome";

import PatientProfile from "./PatientProfile";

import DoctorList from "./patient/DoctorList";
import DoctorAppointments from "./doctor/DoctorAppointments";
import DoctorOverview from "./patient/DoctorOverview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/doctor-home" element={<DoctorHome />} />
        <Route path="/patient-home" element={<PatientHome />} />

        <Route path="/patient-profile" element={<PatientProfile />} />

        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
        <Route path="/doctor-overview/:id" element={<DoctorOverview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
