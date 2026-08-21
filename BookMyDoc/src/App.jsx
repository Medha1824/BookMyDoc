import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import DoctorHome from "./DoctorHome";
import PatientHome from "./PatientHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/doctor-home" element={<DoctorHome />} />
        <Route path="/patient-home" element={<PatientHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
