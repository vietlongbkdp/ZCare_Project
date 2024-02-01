import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

export const UserContext = createContext();

export default function  UserProvider ({ children }) {
    const [user, setUser] = useState('');

    useEffect(() => {
        const token = Cookies.get('JWT');
        // console.log(token)
        if (token) {
            const decodedToken = jwtDecode(token);
            // console.log(decodedToken)
            const useremail = decodedToken.sub;

            const getUser = async () => {
                try {
                    const user1 = await axios.get(`http://localhost:8080/api/user/finduser/${useremail}`);
                    // console.log(user1.data)
                    setUser(user1.data);
                    // console.log(user.id);
                } catch (error) {
                    console.error(error);
                }
            };

            getUser();
        }
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};