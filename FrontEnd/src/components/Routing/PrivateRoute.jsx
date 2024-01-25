import { Navigate, Outlet } from "react-router-dom";
import { getRoleInCookie } from "../Utils/ApiComponent";

const isAuthenticated = () => {
    return false;
};

const isAdmin = () => {
    return getRoleInCookie() === "ROLE_ADMIN";
}
const PrivateRoute = () => {
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAdmin() ? <Outlet /> : <Navigate to="/home" />
}

export default PrivateRoute