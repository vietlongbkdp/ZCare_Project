import { Navigate, Outlet } from "react-router-dom";
import { getRoleInCookie } from "../utils/APISession";

const isAuthenticated = () => {
    return false;
};

const isCustomer = () => {
    return getRoleInCookie() === "ROLE_CUSTOMER";
}
const PrivateRouteCustomer = () => {
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isCustomer() ? <Outlet /> : <Navigate to="/home" />
}

export default PrivateRouteCustomer