import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import DoctorHome from "./doctor/DoctorHome";
import PatientHome from "./patient/PatientHome";
import DoctorList from "./patient/DoctorList";
import DoctorAppointments from "./doctor/DoctorAppointments";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/doctor-home" element={<DoctorHome />} />
        <Route path="/patient-home" element={<PatientHome />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
