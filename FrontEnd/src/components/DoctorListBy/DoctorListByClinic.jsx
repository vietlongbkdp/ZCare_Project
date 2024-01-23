import React from 'react';
import {useParams} from "react-router-dom";
import Header from "../Header/Header";
import DoctorInfoClinic from "../DoctorInfoClinic/DoctorInfoClinic";
import Footer from "../Footer/Footer";

function DoctorListByClinic() {
    const { clinicId } = useParams();
    return (
        <>
            <Header />
            <DoctorInfoClinic clinicId={clinicId}/>
            <Footer />
        </>
    );
}

export default DoctorListByClinic;