import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Home/HomePage";
import AuthLogin from "./components/Authentication/AuthLogin";
import { Route, Routes } from "react-router-dom";
import AuthRegister from "./components/Authentication/AuthRegister";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import Pagerbase from "./components/Dashboard/Paperbase";
import DoctorInfor from "./components/Cooperate/AdminCooperate";
import ClinicAdmin from "./components/ClinicAdmin/ClinicAdmin";
import ChangePassword from "./components/Authentication/ChangePassword";
import DoctorAdmin from "./components/Doctor/DoctorAdmin";


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/home/*" element={<HomePage />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/admin" element={<Pagerbase />}>
          <Route path="doctor" element={<DoctorAdmin />}></Route>
          <Route path="doctorInfor" element={<DoctorInfor />}></Route>
          <Route path="clinic" element={<ClinicAdmin />}></Route>
        </Route>
        <Route path="/cooperate" element={<Pagerbase />}>
          <Route path="doctorInfor" element={<DoctorInfor />}></Route>
        </Route>
        <Route path="/user" element={<Pagerbase />}>
          <Route path="doctorInfor" element={<DoctorInfor />}></Route>
        </Route>
      </Routes>
    </>
  );
}
