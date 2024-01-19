import Cookies from 'js-cookie';

export const getHeader = () => {
    const token = Cookies.get('JWT');
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}