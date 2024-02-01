import React, {useEffect, useState} from 'react';
import Cookies from "js-cookie";
import axios from "axios";
import DoctorComponentAdmin from "./DoctorComponentAdmin";
import Loading from "../Loading/Loading";
import {Typography} from "@mui/material";

function RegisterCustomerAdmin() {
    const userId = Cookies.get('userId');
    const [doctorInfo, setDoctorInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchDoctorInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/doctor/clinic/${userId}`, {
                });
                if (response.status === 200) {
                    setDoctorInfo(response.data);
                   setLoading(false)
                }
            } catch (error) {
                console.error('Error fetching doctor info:', error);
                setLoading(false)
            }
        };
        fetchDoctorInfo();
    }, []);


    return (
        <>
            {loading && <Loading/>}
            <Typography variant="h5" align="center" gutterBottom>ĐẶT LỊCH KHÁM TẠI QUẦY</Typography>
            {doctorInfo.map((doctor, index) => (
                <DoctorComponentAdmin key={doctor.id} doctor={doctor} />
            ))}
        </>
    );
}

export default RegisterCustomerAdmin;