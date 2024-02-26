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
            <Header/>
            <div className={"w-100 d-flex flex-column justify-content-center align-items-center"}
                 style={{height: "200px", backgroundColor: "rgb(237 255 250)"}}>
                <h2 className={" mt-2"}>Tìm kiếm Bác Sĩ</h2>
                <p className={" mt-3"}>Bạn có thể tìm kiếm bác sỹ dựa trên vị trí, chuyên khoa, tên, hoặc tên bệnh viện.</p>
            </div>
            {/*{componentToRender}*/}
            <DoctorInfoClinic clinicId={clinicId} doctorName={doctorName} specialityId={specialityId}/>
            <Footer/>
        </div>
    );
}

export default Search;