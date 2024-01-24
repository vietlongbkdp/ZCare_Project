import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {Link} from "@mui/material";

function AppointmentSchedule() {
    return (
        <div>
            <Header/>
            <div className={"container justify-content-center"}>
                <Link to='/home' className="d-flex" style={{textDecoration: 'none'}}>
                    <span className="me-2"><i className="fa-solid fa-house"></i></span>
                    /
                    <p className="ms-2">Lịch đã hẹn</p>
                </Link>
                <h4>Lịch hẹn đã đặt</h4>


            </div>
            <Footer/>
        </div>
    );
}

export default AppointmentSchedule;