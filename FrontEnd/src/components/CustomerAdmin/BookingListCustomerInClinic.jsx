import React, { useEffect, useState } from 'react'
import dayjs from "dayjs";
import axios from 'axios';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import './customer.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'white',
        color: theme.palette.common.black,
        textAlign: 'left'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: 'left',
        padding: '16px'
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

export default function BookingListCustomerInClinic({ clinicId, customerId, handleHideBookingHistory }) {
    const [booking, setBooking] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/booking/${clinicId}/${customerId}`)
            .then(response => {
                setBooking(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <>
            <Button
                type="button"
                variant="contained"
                sx={{ mb: 1, mr: 1, backgroundColor: 'grey', '&:hover': { backgroundColor: 'gray' } }}
                onClick={handleHideBookingHistory}
            >
                Trở lại
            </Button>
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
                        {booking.length > 0 ? (
                            booking.map((booking, index) => (
                                <StyledTableRow key={booking.id} className='tableContent'>
                                    <StyledTableCell>{index + 1}</StyledTableCell>
                                    <StyledTableCell>
                                        <div className={"d-flex flex-column"}>
                                            <p>Mã Bác sĩ: {booking?.doctor?.id}</p>
                                            <p>Bác sĩ: {booking?.doctor?.doctorName}</p>
                                            <p>Phòng khám: {booking?.doctor?.clinic?.clinicName} </p>
                                            <p>Chuyên khoa: {booking?.doctor?.speciality?.specialtyName} </p>
                                            <p>Địa chỉ khám: {booking?.doctor?.clinic?.address} </p>
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <p>Mã bệnh nhân: {booking?.customer?.id}</p>
                                        <p>Bệnh nhân: {booking?.customer?.fullName}</p>
                                        <p>Giới tính: {booking?.customer?.gender} </p>
                                        <p>Phone: {booking?.customer?.phone} </p>
                                        <p>Ngày sinh: {dayjs(booking?.customer?.dob).format('DD/MM/YYYY')} </p>
                                    </StyledTableCell>
                                    <StyledTableCell>{booking?.bookingDate}</StyledTableCell>
                                    <StyledTableCell>{booking?.schedule?.timeItem}</StyledTableCell>
                                    <StyledTableCell>{booking?.fee}</StyledTableCell>
                                    <StyledTableCell>{booking?.result?.file ? booking?.result?.file : "Chưa có kết quả"}</StyledTableCell>
                                    <StyledTableCell>
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
        </>
    );
}