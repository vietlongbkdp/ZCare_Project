import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

function AppointmentSchedule() {
    const [booking,setBooking]=useState([]);
    const UserId = Cookies.get('userId');
    useEffect(() => {
        axios.get(`http://localhost:8080/api/booking/${UserId}`)
            .then(response => {
                setBooking(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    return (
        <div>
            <Header/>
            <div className="d-flex justify-content-center align-items-center"
                 style={{backgroundColor: "rgb(237 255 250)", height: "150px"}}>
                <h2>THÔNG TIN LỊCH HẸN</h2>
            </div>
            <div className={"container justify-content-center"}>
                <Link to='/home' className="d-flex" style={{textDecoration: 'none'}}>
                    <span className="me-2"><i className="fa-solid fa-house"></i></span>
                    /
                    <p className="ms-2">Lịch đã hẹn</p>
                </Link>
                <h4>Lịch hẹn đã đặt</h4>
                <table className="table" key={booking.id}>
                    <tbody>
                    {booking.length > 0 ? (
                        booking.map(booking => (
                            <tr>
                                <td>{booking?.customer?.fullName}</td>
                                <td>{booking?.doctor?.doctorName}</td>
                                <td>{booking?.schedule?.weekday}</td>
                                <td>{booking?.schedule?.timeItem}</td>
                                <td>{booking?.status?.type}</td>
                            </tr>
                        ))
                    ) : (
                        <p className="d-flex justify-content-center" style={{color: "red"}}>
                            Bạn chưa đặt lịch hẹn trên trình duyệt này!
                        </p>
                    )}
                    </tbody>
                </table>
            </div>
            <Footer/>
        </div>
    );
}

export default AppointmentSchedule;