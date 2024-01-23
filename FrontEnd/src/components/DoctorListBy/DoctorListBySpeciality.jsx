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
    const { specialityId } = useParams();

    let componentToRender;

    switch (specialityId) {
        case "1":
            componentToRender = <Pediatric/>;
            break;
        case "2":
            componentToRender = <Ophthalmology />;
            break;
        case "3":
            componentToRender = <CardiologyInfor />;
            break;
        case "4":
            componentToRender = <EarsNoseThroat />;
            break;
        case "5":
            componentToRender = <Dermatology />;
            break;
        case "6":
            componentToRender = <Pediatrics />;
            break;
        case "7":
            componentToRender = <Dentistry />;
            break;
        default:
            componentToRender = null;
    }

    return (
        <>
            <Header />
            {componentToRender}
                <DoctorInfoClinic specialityId={specialityId}/>
            <Footer />
        </>
    );
}

export default DoctorListBySpeciality;