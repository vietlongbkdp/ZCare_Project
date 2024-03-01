import { Navigate, Outlet } from "react-router-dom";
import { getRoleInCookie } from "../utils/APISession";

const isAuthenticated = () => {
    return false;
};

const isAdmin = () => {
    return getRoleInCookie() === "ROLE_ADMIN";
}
const PrivateRouteAdmin = () => {
    return isAdmin() ? <Outlet /> : <Navigate to="/home" />
}

export default PrivateRouteAdmin