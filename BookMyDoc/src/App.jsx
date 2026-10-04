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
import DoctorHistory from "./doctor/DoctorHistory";
import PatientHistory from "./patient/PatientHistory";
import PatientEditProfile from "./patient/PatientEditProfile";
import DoctorEditProfile from "./doctor/DoctorEditProfile";


import DoctorList from "./patient/DoctorList";
import DoctorAppointments from "./doctor/DoctorAppointments";
import PatientAppointments from "./patient/PatientAppointments";
import DoctorOverview from "./patient/DoctorOverview";
import DoctorSpecialization from "./doctor/DoctorSpecialization";
import DoctorDailySchedule from "./doctor/DoctorDailySchedule";

import CarbonFootprintDisplay from "./CarbonFootprintDisplay";

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
        <Route
          path="/doctor-specialization"
          element={<DoctorSpecialization />}
        />
        <Route path="/signup-patient" element={<SignupPatient />} />

        <Route path="/doctor-home" element={<DoctorHome />} />
        <Route path="/patient-home" element={<PatientHome />} />

        <Route path="/doctor-edit-profile" element={<DoctorEditProfile />} />
        <Route path="/patient-edit-profile" element={<PatientEditProfile />} />

        <Route path="/doctor-history" element={<DoctorHistory />} />
        <Route path="/patient-history" element={<PatientHistory />} />
       
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
        <Route path="/appointments" element={<PatientAppointments />} />
        <Route path="/doctor-overview/:id" element={<DoctorOverview />} />
        <Route
          path="/doctor-daily-schedule"
          element={<DoctorDailySchedule />}
        />
      </Routes>
      <CarbonFootprintDisplay />
    </BrowserRouter>
  );
}

export default App;