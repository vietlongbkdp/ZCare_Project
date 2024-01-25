import { Navigate, Outlet } from "react-router-dom";
import { getRoleInCookie } from "../utils/APISession";

const isAuthenticated = () => {
    return false;
};

const isClinicAdmin = () => {
    return getRoleInCookie() === "ROLE_ADMIN_CLINIC";
}
const PrivateRouteClinicAdmin = () => {
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isClinicAdmin() ? <Outlet /> : <Navigate to="/home" />
}

export default PrivateRouteClinicAdmin