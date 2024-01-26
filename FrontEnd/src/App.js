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
import DoctorAdmin from "./components/Doctor/DoctorAdmin"
import CustomerAdmin from "./components/CustomerAdmin/CustomerAdmin"
import DoctorListBySpeciality from "./components/DoctorListBy/DoctorListBySpeciality";
import DoctorListByClinic from "./components/DoctorListBy/DoctorListByClinic";
import Search from "./components/DoctorListBy/search";
import DoctorInfo from "./components/DoctorInfo/DoctorInfo";
import Booking from "./components/BookingPage/Booking";
import DoctorInfoClinic from "./components/DoctorInfoClinic/DoctorInfoClinic";
import CustomerDashboard from "./components/CustomerDashboard/CustomerDashboard";
import AppointmentSchedule from "./components/CustomerDashboard/AppointmentSchedule";
import PrivateRouteAdmin from "./components/routing/PrivateRouteAdmin";
import PrivateRouteClinicAdmin from "./components/routing/PrivateRouteClinicAdmin";
import PrivateRouteDoctor from "./components/routing/PrivateRouteDoctor";
import PrivateRouteCustomer from "./components/routing/PrivateRouteCustomer";
import DoctorInClinic from "./components/Doctor/DoctorInClinic";
import AdminViewer from "./components/adminViewer/adminViewer";

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
        <Route element={<PrivateRouteAdmin/>}>
          <Route path="/admin" element={<Pagerbase/>}>
            <Route path="" element={<AdminViewer/>}></Route>
            <Route path="doctor" element={<DoctorAdmin API_URL={API_DOCTOR}/>}></Route>
            <Route path="doctorInfor" element={<DoctorInfor/>}></Route>
            <Route path="clinic" element={<ClinicAdmin/>}></Route>
            <Route path="customer" element={<CustomerAdmin/>}></Route>
          </Route>
        </Route>
        <Route element={<PrivateRouteClinicAdmin/>}>
          <Route path="/clinicadmin" element={<Pagerbase/>}>
            <Route path="doctorInfor" element={<DoctorInfor/>}></Route>
            <Route path="clinic" element={<DoctorInClinic />}></Route>
          </Route>
        </Route>
        <Route element={<PrivateRouteDoctor/>}>
          <Route path="/doctoradmin" element={<Pagerbase/>}>
            <Route path="doctorInfor" element={<DoctorInfor/>}></Route>
            <Route path="clinic" element={<ClinicAdmin/>}></Route>
          </Route>
        </Route>
        <Route path="/customer" element={<Pagerbase />}>
          <Route path="doctorInfor" element={<DoctorInfor />}></Route>
        </Route>
        <Route path="/createSchedule" element={<ScheduleCreate />} />
        <Route path="/showDoctor" element={<DoctorInfoClinic />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/list-speciality/:specialityId" element={<DoctorListBySpeciality />} />
        <Route path="/list-clinic/:clinicId" element={<DoctorListByClinic />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/doctorDetail/:doctorId" element={<DoctorInfo/>} />
        <Route element={<PrivateRouteCustomer/>}>
          <Route path="/information-customer" element={<CustomerDashboard/>}/>
          <Route path="/appointment-schedule" element={<AppointmentSchedule/>}/>
        </Route>
      </Routes>
    </>
  );
}
