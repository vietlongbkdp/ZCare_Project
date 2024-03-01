import React, {useContext, useEffect, useState} from 'react'
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
import { Typography } from '@mui/material';
import { saveAs } from 'file-saver';
import {ApiContext} from "../ApiContext/ApiProvider";

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

export default function BookingListCustomerInClinic({ clinicId, customerId, handleHideBookingHistory }) {
    const [booking, setBooking] = useState([]);
    const { API } = useContext(ApiContext)
    useEffect(() => {
        axios.get(`${API}/api/booking/${clinicId}/${customerId}`)
            .then(response => {
                setBooking(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const handleClickView = (idBooking) => {
        booking.forEach((item) => {
            if (item.id === idBooking) {
                const fileBytes = item.result.file;
                const decodedData = atob(fileBytes);
                const arrayBuffer = new ArrayBuffer(decodedData.length);
                const uint8Array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < decodedData.length; i++) {
                    uint8Array[i] = decodedData.charCodeAt(i);
                }
                const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                window.open(url);
            }
        });
    };
    const handleClickDownload = (idBooking) => {
        booking.forEach((item) => {
            if (item.id === idBooking) {
                const fileBytes = item.result.file;
                const decodedData = atob(fileBytes);
                const arrayBuffer = new ArrayBuffer(decodedData.length);
                const uint8Array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < decodedData.length; i++) {
                    uint8Array[i] = decodedData.charCodeAt(i);
                }
                const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
                saveAs(blob, item?.customer?.fullName + "_" + item?.bookingDate + '.pdf');
            }
        });
    };

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
            <Typography variant='h5' align='center' gutterBottom>LỊCH SỬ KHÁM BỆNH</Typography>
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
                                        <p>Giới tính: {
                                            booking?.customer?.gender && (() => {
                                                if (booking?.customer?.gender == "MALE") {
                                                    return "Nam"
                                                }
                                                else if (booking?.customer?.gender == "FEMALE") {
                                                    return "Nữ"
                                                }
                                                else {
                                                    return "Khác"
                                                }
                                            })()
                                        } </p>
                                        <p>Phone: {booking?.customer?.phone} </p>
                                        <p>Ngày sinh: {dayjs(booking?.customer?.dob).format('DD/MM/YYYY')} </p>
                                        <p>Lý do khám: {booking?.reason} </p>
                                    </StyledTableCell>
                                    <StyledTableCell>{booking?.bookingDate}</StyledTableCell>
                                    <StyledTableCell>{booking?.schedule?.timeItem}</StyledTableCell>
                                    <StyledTableCell>{booking && booking.fee ? (booking.fee * 1000).toLocaleString() + "đ" : ""}</StyledTableCell>
                                    <StyledTableCell>{(booking?.result?.file) ? (<div className={"d-flex flex-column"}>
                                        <button type="button" className="btn btn-success"
                                            style={{ width: "100px", height: '30px', fontSize: 'small', marginBottom: "10px" }} onClick={() => {
                                                handleClickDownload(booking.id)
                                            }}>Download
                                        </button>
                                        <button type="button" className="btn btn-warning" style={{ width: "100px", height: '30px', fontSize: 'small' }}
                                            onClick={() => {
                                                handleClickView(booking.id)
                                            }}>Xem kết quả
                                        </button>
                                    </div>) : "Chưa có kết quả"}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {booking?.status && (
                                            (() => {
                                                if (booking?.status === "CONFIRMING") {
                                                    return "Chưa xác nhận";
                                                } else if (booking?.status === "CUSTOMERCONFIMED") {
                                                    return "Đã xác nhận";
                                                } else if (booking?.status === "PAID") {
                                                    return "Đã Thanh toán";
                                                } else if (booking?.status === "EXAMINING") {
                                                    return "Đang khám";
                                                } else if (booking?.status === "RESULTING") {
                                                    return "Đã trả kết quả";
                                                } else if (booking?.status === "CANCEL"){
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