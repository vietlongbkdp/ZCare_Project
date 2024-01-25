import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const getHeader = () => {
    const token = Cookies.get('JWT');
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

export const getRoleInCookie = () => {
    const token = Cookies.get('JWT') || null;
    if (token !== null) {
        const decodedToken = jwtDecode(token);
        return decodedToken.roles[0];
    } else {
        return null;
    }
}