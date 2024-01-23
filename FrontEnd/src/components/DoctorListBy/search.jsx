import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../Header/Header";
import DoctorInfoClinic from "../DoctorInfoClinic/DoctorInfoClinic";
import Footer from "../Footer/Footer";
function Search() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const doctorName = queryParams.get('doctorName');
    const clinicId = queryParams.get('clinicId');
    const specialityId = queryParams.get('specialityId');
    return (
        <div>
            <Header />
            {/*{componentToRender}*/}
            <DoctorInfoClinic clinicId={clinicId} doctorName={doctorName} specialityId={specialityId} />
            <Footer />
        </div>
    );
}

export default Search;