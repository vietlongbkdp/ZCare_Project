import React, {useEffect, useState} from 'react';
import Cookies from "js-cookie";
import axios from "axios";
import DoctorComponent from "../DoctorInfoClinic/DoctorComponent";

function RegisterCustomerAdmin() {
    const userId = Cookies.get('userId');
    const [doctorInfo, setDoctorInfo] = useState([]);
    console.log(userId)
    useEffect(() => {
        const fetchDoctorInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/doctor/clinic/${userId}`, {
                });
                if (response.status === 200) {
                    setDoctorInfo(response.data);
                    console.log(response.data)
                }
            } catch (error) {
                console.error('Error fetching doctor info:', error);
            }
        };
        fetchDoctorInfo();
    }, []);
    return (
        <>
            {doctorInfo.map((doctor, index) => (
                <DoctorComponent key={doctor.id} doctor={doctor} />
            ))}
        </>
    );
}

export default RegisterCustomerAdmin;