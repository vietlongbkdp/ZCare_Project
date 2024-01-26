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
    }, [UserId]);
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
                <table className="table table-bordered" key={booking.id}>
                    <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Thông tin bác sĩ</th>
                        <th scope="col">Thông tin bệnh nhân</th>
                        <th scope="col">Ngày đặt</th>
                        <th scope="col">Thời gian</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Kết quả</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thời gian tạo</th>
                    </tr>
                    </thead>
                    <tbody >
                    {booking.length > 0 ? (
                        booking.map((booking,index) => (
                            <tr style={{verticalAlign: 'middle'}}>
                                <td>{index + 1}</td>
                                <td className={"d-flex flex-column"}>
                                    <p>Mã Bác sĩ : {booking?.doctor?.id}</p>
                                    <p>Bác sĩ: {booking?.doctor?.doctorName}</p>
                                    <p>Phòng khám:{booking?.doctor?.clinic?.clinicName} </p>
                                    <p>Chuyên khoa:{booking?.doctor?.speciality?.specialtyName} </p>
                                    <p>Địa chỉ khám:{booking?.doctor?.clinic?.address} </p>
                                </td>
                                <td>
                                    <p>Mã bệnh nhân : {booking?.customer?.id}</p>
                                    <p>Bệnh nhân: {booking?.customer?.fullName}</p>
                                    <p>Giới tính:{booking?.customer?.gender} </p>
                                    <p>Phone:{booking?.customer?.phone} </p>
                                    <p>Ngày sinh:{booking?.customer?.dob} </p>
                                </td>
                                <td>{booking?.bookingDate}</td>
                                <td>{booking?.schedule?.timeItem}</td>
                                <td>{booking?.fee}</td>
                                <td>{booking?.result?.file}</td>
                                <td>{booking?.status?.type}</td>
                                <td>{booking?.createAt}</td>
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