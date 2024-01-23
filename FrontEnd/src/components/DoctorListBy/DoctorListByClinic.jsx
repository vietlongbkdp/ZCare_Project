import React from 'react';
import {useParams} from "react-router-dom";
import Header from "../Header/Header";
import DoctorInfoClinic from "../DoctorInfoClinic/DoctorInfoClinic";
import Footer from "../Footer/Footer";

function DoctorListByClinic() {
    const { clinicId } = useParams();
    return (
        <>
            <Header/>
            <div className={"w-100 d-flex flex-column justify-content-center align-items-center"}
                 style={{height: "200px", backgroundColor: "rgb(237 255 250)"}}>
                <h2 className={" mt-2"}>Thông tin Phòng khám</h2>
                <p className={" mt-3"}>Phòng khám là nơi cung cấp dịch vụ y tế cơ bản và chẩn đoán ban đầu cho bệnh nhân.</p>
            </div>
            <DoctorInfoClinic clinicId={clinicId}/>
            <Footer/>
        </>
    );
}

export default DoctorListByClinic;