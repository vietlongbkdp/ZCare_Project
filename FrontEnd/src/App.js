import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Home/HomePage";
import AuthLogin from "./components/Authentication/AuthLogin";
import { Route, Routes } from "react-router-dom";
import AuthRegister from './components/Authentication/AuthRegister';
import ForgotPassword from './components/Authentication/ForgotPassword';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        {/* <Route path="/dashboard" element={<Admin />} /> */}
      </Routes>
    </>
  );
}
