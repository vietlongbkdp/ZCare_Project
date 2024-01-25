import { Navigate, Outlet } from "react-router-dom";
import { getRoleInCookie } from "../utils/APISession";

const isAuthenticated = () => {
    return false;
};

const isDoctor = () => {
    return getRoleInCookie() === "ROLE_DOCTOR";
}
const PrivateRouteDoctor = () => {
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isDoctor() ? <Outlet /> : <Navigate to="/home" />
}

export default PrivateRouteDoctor