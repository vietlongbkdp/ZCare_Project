import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LoginAndRegister from "./components/Authentication/LoginAndRegister";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <>
      <LoginAndRegister />
      <ToastContainer />
    </>
  );
}
