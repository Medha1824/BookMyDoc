import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import DoctorHome from "./doctor/DoctorHome";
import PatientHome from "./patient/PatientHome";
import PatientProfile from "./PatientProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/doctor-home" element={<DoctorHome />} />
        <Route path="/patient-home" element={<PatientHome />} />
        <Route path="/patient-profile" element={<PatientProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
