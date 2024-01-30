import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import DoctorInfoClinic from "../DoctorInfoClinic/DoctorInfoClinic";
import Footer from "../Footer/Footer";
import HTMLReactParser from "html-react-parser";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import Loading from "../Loading/Loading";

function DoctorListByClinic() {
    const [clinic, setClinic] = useState();
    const [clinicUserId, setClinicUserId] = useState();
    const [loading, setLoading] = useState(true);

    const storedUserId = Cookies.get('userId');

    useEffect(() => {
        const finddUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user/userlogin/${storedUserId}`)
                console.log(response.data)
                setClinicUserId(response.data.id)
                setLoading(false)
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        }
        finddUser();
    }, [])

    useEffect(() => {

        if (clinicUserId !== undefined) {
            axios.get(`http://localhost:8080/api/clinic/${clinicUserId}`)
                .then(response => {
                    setClinic(response.data);
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Error:', error);
                    setLoading(false)
                });
        }

    }, [clinicUserId]);

    return (
        <>
            {loading && <Loading/>}
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