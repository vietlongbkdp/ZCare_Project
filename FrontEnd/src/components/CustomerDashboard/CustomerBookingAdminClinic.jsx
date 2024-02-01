import React, {useEffect, useState} from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import './custom.css'
import {Pagination, Typography} from "@mui/material";


function AppointmentSchedule() {
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const [bookingCustomer, setbookingCustomer] = useState([]);
    const [filteredBooking, setFilteredBooking] = useState([]);
    const userId = Cookies.get('userId');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/booking/adminClinic/${userId}`)
            .then(response => {
                setbookingCustomer(response.data);
                setFilteredBooking(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [userId, currentPage]);



    const filterBookingByDate = (date) => {
        const formattedDate = dayjs(date).format("DD/M/YYYY");
        console.log(formattedDate);
        if (formattedDate !== "Invalid Date") {
            const filtered = bookingCustomer.filter(
                (item) => item.bookingDate === formattedDate
            );
            setFilteredBooking(filtered);
        } else {
            setFilteredBooking(bookingCustomer);
        }
    };

    const currentCustomerBookingList = filteredBooking.slice(startIndex, endIndex);

    return (
        <div>
            <Typography variant='h5' align='center' gutterBottom>LỊCH SỬ KHÁM BỆNH TRÊN PHÒNG KHÁM</Typography>
            <div className={"container justify-content-center"}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <h6 style={{marginRight: '10px'}}> Tìm kiếm theo ngày: </h6>
                    <input className="custom-input" type="date" onChange={(event) => filterBookingByDate(event.target.value)}/>
                </div>
                <table style={{marginTop: '20px'}} className="table table-bordered table-striped"
                       key={filteredBooking.id}>
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Thông tin bác sĩ</th>
                        <th scope="col">Thông tin bệnh nhân</th>
                        <th scope="col">Ngày đặt</th>
                        <th scope="col">Thời gian</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thời gian tạo</th>
                    </tr>
                    </thead>
                    <tbody>
                    { currentCustomerBookingList.length > 0 ? (
                        currentCustomerBookingList.map((booking, index) => (
                            <tr key={booking.id} className="customTable" style={{verticalAlign: 'middle'}}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className={"d-flex flex-column"}>
                                        <p>Mã Bác sĩ: {booking?.doctor?.id}</p>
                                        <p>Bác sĩ: {booking?.doctor?.doctorName}</p>
                                        <p>Phòng khám: {booking?.doctor?.clinic?.clinicName} </p>
                                        <p>Chuyên khoa: {booking?.doctor?.speciality?.specialtyName} </p>
                                        <p>Địa chỉ khám: {booking?.doctor?.clinic?.address} </p>
                                    </div>
                                </td>
                                <td>
                                    <p>Mã bệnh nhân: {booking?.customer?.id}</p>
                                    <p>Bệnh nhân: {booking?.customer?.fullName}</p>
                                    <p>Giới tính: {
                                        booking?.customer?.gender && (() => {
                                            if (booking?.customer?.gender === 'MALE') {
                                                return 'Nam'
                                            } else if (booking?.customer?.gender === 'FEMALE') {
                                                return 'Nữ'
                                            } else {
                                                return 'Khác'
                                            }
                                        })()
                                    } </p>
                                    <p>Phone: {booking?.customer?.phone} </p>
                                    <p>Ngày sinh: {dayjs(booking?.customer?.dob).format('DD/MM/YYYY')} </p>
                                </td>
                                <td>{booking?.bookingDate}</td>
                                <td>{booking?.schedule?.timeItem}</td>
                                <td>{booking?.fee}</td>
                                <td>
                                    {booking?.status && (
                                        (() => {
                                            if (booking?.status === "CONFIRMING") {
                                                return "Tiếp nhận";
                                            } else if (booking?.status === "CUSTOMERCONFIMED") {
                                                return "Khách hàng đã xác nhận";
                                            } else if (booking?.status === "DOCTORCONFIRMED") {
                                                return "Bác sỹ đã xác nhận";
                                            } else if (booking?.status === "PAID") {
                                                return "Đã Thanh toán";
                                            } else if (booking?.status === "EXAMINED") {
                                                return "Đã khám";
                                            } else if (booking?.status === "RESULTING") {
                                                return "Đã trả kết quả";
                                            } else if (booking?.status === "CANCEL") {
                                                return "Đã hủy";
                                            }
                                        })()
                                    )}
                                </td>
                                <td>{dayjs(booking.createAt).format("DD/MM/YYYY")}</td>
                            </tr>
                        ))
                    ) : (
                        <p className="d-flex justify-content-center" style={{color: "red"}}>
                            Bạn chưa có lịch hẹn!
                        </p>
                    )}
                    </tbody>
                </table>
                <Pagination
                    count={Math.ceil(filteredBooking.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                    style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
                />
            </div>
        </div>
    );
}

export default AppointmentSchedule;