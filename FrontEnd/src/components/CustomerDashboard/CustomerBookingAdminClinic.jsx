import React, { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import './custom.css'
import { Pagination, Typography } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'white',
        color: theme.palette.common.black,
        textAlign: 'left'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: 'left',
        padding: '10px'
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

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
        const formattedDate = dayjs(date).format("D/M/YYYY");
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
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <h6 style={{ marginRight: '10px' }}> Tìm kiếm theo ngày: </h6>
                <input className="custom-input" type="date" onChange={(event) => filterBookingByDate(event.target.value)} />
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>STT</StyledTableCell>
                            <StyledTableCell>Thông tin bác sĩ</StyledTableCell>
                            <StyledTableCell>Thông tin bệnh nhân</StyledTableCell>
                            <StyledTableCell>Ngày đặt</StyledTableCell>
                            <StyledTableCell>Thời gian</StyledTableCell>
                            <StyledTableCell> Giá </StyledTableCell>
                            <StyledTableCell> Kết quả</StyledTableCell>
                            <StyledTableCell>Trạng thái</StyledTableCell>
                            <StyledTableCell>Thời gian tạo</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentCustomerBookingList.length > 0 ? (
                            currentCustomerBookingList.map((booking, index) => (
                                <StyledTableRow key={booking.id} className='tableContent'>
                                    <StyledTableCell sx={{ textAlign: 'center !important' }}>{index + 1}</StyledTableCell>
                                    <StyledTableCell>
                                        <div className={"d-flex flex-column"}>
                                            <p>Bác sĩ: {booking?.doctor?.doctorName}</p>
                                            <p>Phòng khám: {booking?.doctor?.clinic?.clinicName} </p>
                                            <p>Chuyên khoa: {booking?.doctor?.speciality?.specialtyName} </p>
                                            <p>Địa chỉ khám: {booking?.doctor?.clinic?.address} </p>
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <p>Bệnh nhân: {booking?.customer?.fullName}</p>
                                        <p>Giới tính: {booking?.customer?.gender} </p>
                                        <p>Phone: {booking?.customer?.phone} </p>
                                        <p>Ngày sinh: {dayjs(booking?.customer?.dob).format('DD/MM/YYYY')} </p>
                                    </StyledTableCell>
                                    <StyledTableCell>{booking?.bookingDate}</StyledTableCell>
                                    <StyledTableCell>{booking?.schedule?.timeItem}</StyledTableCell>
                                    <StyledTableCell>{booking && booking.fee ? (booking.fee * 1000).toLocaleString() + "đ" : ""}</StyledTableCell>
                                    <StyledTableCell>{booking?.result?.file ? booking?.result?.file : "Chưa có kết quả"}</StyledTableCell>
                                    <StyledTableCell>
                                        {booking?.status && (
                                            (() => {
                                                if (booking?.status === "CONFIRMING") {
                                                    return "Chưa xác nhận";
                                                } else if (booking?.status === "CUSTOMERCONFIMED") {
                                                    return "Đã xác nhận";
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
                                    </StyledTableCell>
                                    <StyledTableCell>{dayjs(booking.createAt).format("DD/MM/YYYY")}</StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <p className="d-flex justify-content-center" style={{ color: "red" }}>
                                Bạn chưa có lịch hẹn!
                            </p>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
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
    );
}

export default AppointmentSchedule;