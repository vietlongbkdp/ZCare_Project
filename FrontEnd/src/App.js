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
import ScheduleCreate from "./components/ScheduleCreate/ScheduleCreate";
import { useContext } from "react";
import { ApiContext } from "./components/ApiContext/ApiProvider";
import DoctorInfoClinic from "./components/DoctorInfoClinic/DoctorInfoClinic";
import DoctorAdmin from "./components/Doctor/DoctorAdmin"
import CustomerAdmin from "./components/CustomerAdmin/CustomerAdmin"
import PageCustomerBooking from "./components/PageCustomerBooking/PageCustomerBooking";





export default function App() {
  const { API_DOCTOR } = useContext(ApiContext)
  return (
    <>
      <Routes>
        <Route path="/home/*" element={<HomePage />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password/:userId" element={<ChangePassword />} />
        <Route path="/admin" element={<Pagerbase />} roles={['ROLE_ADMIN']} >
          <Route path="doctor" element={<DoctorAdmin API_URL={API_DOCTOR} />}></Route>
          <Route path="doctorInfor" element={<DoctorInfor />}></Route>
          <Route path="clinic" element={<ClinicAdmin />}></Route>
          <Route path="customer" element={<CustomerAdmin/>}></Route>
        </Route>
        <Route path="/cooperate" element={<Pagerbase />}>
          <Route path="doctorInfor" element={<DoctorInfor />}></Route>
        </Route>
        <Route path="/user" element={<Pagerbase />}>
          <Route path="doctorInfor" element={<DoctorInfor />}></Route>
        </Route>
        <Route path="/createSchedule" element={<ScheduleCreate />} />
      </Routes>
    {/*<DoctorInfoClinic/>*/}
    </>
  );
}
