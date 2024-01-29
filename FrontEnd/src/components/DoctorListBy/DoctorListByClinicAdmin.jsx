import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import DoctorInfoClinic from "../DoctorInfoClinic/DoctorInfoClinic";
import Footer from "../Footer/Footer";
import HTMLReactParser from "html-react-parser";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";

function DoctorListByClinic() {
    const [clinic, setClinic] = useState();
    const [clinicUserId, setClinicUserId] = useState();

    const storedUserId = Cookies.get('userId');

    useEffect(() => {
        const finddUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user/userlogin/${storedUserId}`)
                console.log(response.data)
                setClinicUserId(response.data.id)
            } catch (error) {
                console.error(error);
            }
        }
        finddUser();
    }, [])

    useEffect(() => {

        if (clinicUserId !== undefined) {
            axios.get(`http://localhost:8080/api/clinic/${clinicUserId}`)
                .then(response => {
                    setClinic(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

    }, [clinicUserId]);

    return (
        <>
            <div className={"my-2"} >
                <div className={"container pb-4"}>
                    <div className={"d-flex flex-column mt-3"}>
                        {clinic && clinic.clinicInfo && HTMLReactParser(clinic.clinicInfo)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorListByClinic;