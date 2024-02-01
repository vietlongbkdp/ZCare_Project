import React from 'react';
import Pediatric from "../SpecialityList/Pediatric";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import DoctorInfoClinic from "../DoctorInfoClinic/DoctorInfoClinic";
import {useParams} from "react-router-dom";
import EarsNoseThroat from "../SpecialityList/EarsNoseThroat";
import CardiologyInfor from "../SpecialityList/CardiologyInfor";
import Dermatology from "../SpecialityList/Dermatology";
import Ophthalmology from "../SpecialityList/Ophthalmology";
import Pediatrics from "../SpecialityList/Pediatrics";
import Dentistry from "../SpecialityList/Dentistry";

function DoctorListBySpeciality() {
    const {specialityId} = useParams();

    let componentToRender;

    switch (specialityId) {
        case "1":
            componentToRender = <Pediatric/>;
            break;
        case "2":
            componentToRender = <Ophthalmology/>;
            break;
        case "3":
            componentToRender = <CardiologyInfor/>;
            break;
        case "4":
            componentToRender = <EarsNoseThroat/>;
            break;
        case "5":
            componentToRender = <Dermatology/>;
            break;
        case "6":
            componentToRender = <Pediatrics/>;
            break;
        case "7":
            componentToRender = <Dentistry/>;
            break;
        default:
            componentToRender = null;
    }

    return (
        <>
            <Header/>
            <div className={"w-100 d-flex flex-column justify-content-center align-items-center"}
                 style={{height: "200px", backgroundColor: "rgb(237 255 250)"}}>
                <h2 className={" mt-2"}>Thông tin Chuyên khoa</h2>
                <p className={" mt-3"}>Các chuyên khoa đảm nhận vai trò quan trọng trong chẩn đoán, điều
                    trị và quản lý các bệnh và tình trạng sức khỏe của bệnh nhân.</p>
            </div>
            {componentToRender}
            <div className={"container-fluid py-3"} style={{backgroundColor:"rgb(238 238 238)"}}>
                <DoctorInfoClinic  specialityId={specialityId}/>
            </div>

            <Footer/>
        </>
    );
}

export default DoctorListBySpeciality;