import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Header from "../Header/Header";
import DoctorInfoClinic from "../DoctorInfoClinic/DoctorInfoClinic";
import Footer from "../Footer/Footer";
import HTMLReactParser from "html-react-parser";
import axios from "axios";
import Loading from "../Loading/Loading";

function DoctorListByClinic() {
    const {clinicId} = useParams();
    const [clinic, setClinic] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/clinic/${clinicId}`)
            .then(response => {
                setClinic(response.data);
                setLoading(false)
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false)
            });

    }, []);

    return (
        <>
            {loading && <Loading/>}
            <Header/>
            <div className="w-100 d-flex flex-column justify-content-center align-items-center"
                 style={{height: "200px", backgroundColor: "rgb(237 255 250)"}}>
                <h2 className="mt-2">Thông tin Phòng khám</h2>
                <p className="mt-3">Phòng khám là nơi cung cấp dịch vụ y tế cơ bản và chẩn đoán ban đầu cho bệnh
                    nhân.</p>
            </div>
                <div className={"container d-flex justify-content-center my-3 row"}>
                    <div className={"col-4"}>
                        <img src={clinic.clinicLogo} alt="..." style={{width:'200px'}}/>
                    </div>
                    <div className={"col-8"}>aaa</div>
                </div>



            <DoctorInfoClinic clinicId={clinicId}/>
            <div className={"my-5"}>
                <div className={"container pb-4"}>
                    <div className={"d-flex flex-column mt-3"}>
                        {clinic && clinic.clinicInfo && HTMLReactParser(clinic.clinicInfo)}
                    </div>
                </div>
            </div>
            <Footer/>


        </>
    );
}

export default DoctorListByClinic;