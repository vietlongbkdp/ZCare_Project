import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ApiProvider from "./components/ApiContext/ApiProvider.jsx";
import UserProvider from "./components/utils/ApiUserLogin"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <UserProvider>
                <ApiProvider>
                    <App/>
                    <ToastContainer />
                </ApiProvider>
        </UserProvider>
    </BrowserRouter>
);
reportWebVitals();
