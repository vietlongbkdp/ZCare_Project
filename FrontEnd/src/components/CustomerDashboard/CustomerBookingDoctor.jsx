import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import './custom.css'
import SearchIcon from "@mui/icons-material/Search";
import {Search} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import {IconButton, InputAdornment, InputBase, TextField} from "@mui/material";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {Box} from "@mui/system";
import {ClearIcon, DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


const filter = createFilterOptions();

function AppointmentSchedule() {
    const [bookingCustomer, setBookingCustomer] = useState([]);
    const [selectedDate, setSelectedDate] = useState(''); // Ngày được chọn để lọc
    const [filteredBooking, setFilteredBooking] = useState([]);
    const [defaultDateValue, setDefaultDateValue] = useState("MM/DD/YYYY");
    const userId = Cookies.get('userId');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/booking/doctor/${userId}`)
            .then(response => {
                setBookingCustomer(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [userId]);
    const selectAllPatients = () => {
        setSelectedDate('MM/DD/YYYY');
        setDefaultDateValue("MM/DD/YYYY");
        setFilteredBooking(bookingCustomer);
    };
    const filterBookingByDate = (date) => {
        const formattedDate = dayjs(date).format("DD/M/YYYY");
        setSelectedDate(formattedDate);
        console.log(formattedDate)
        if (formattedDate !== null) {
            const filtered = bookingCustomer.filter(
                (item) => item.bookingDate === formattedDate
            );
            setFilteredBooking(filtered);

        }else {
            setDefaultDateValue("MM/DD/YYYY");
        }

    };



    return (
        <div>

            <div className={"container justify-content-center"}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Lịch khám"
                            value={selectedDate}
                            onChange={(date) => filterBookingByDate(date)}
                        />
                        <button onClick={selectAllPatients}>Select All</button>
                </LocalizationProvider>
                <TextField
                    sx={{ml: 1}}
                    label='Tìm kiếm bệnh nhân'
                    // value={doctorName}
                    // onChange={(event) => setDoctorName(event.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Box sx={{mt: 2}}>
                    <table className="table table-bordered table-striped" key={bookingCustomer.id}>
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
                        <tbody>
                        {filteredBooking.length > 0 ? (
                            filteredBooking.map((booking, index) => (
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
                                        <p>Giới tính: {booking?.customer?.gender} </p>
                                        <p>Phone: {booking?.customer?.phone} </p>
                                        <p>Ngày sinh: {dayjs(booking?.customer?.dob).format('DD/MM/YYYY')} </p>
                                    </td>
                                    <td>{booking?.bookingDate}</td>
                                    <td>{booking?.schedule?.timeItem}</td>
                                    <td>{booking?.fee}</td>
                                    <td>{booking?.result?.file ? booking?.result?.file : "Chưa có kết quả"}</td>
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
                </Box>
            </div>
        </div>
    );
}

export default AppointmentSchedule;