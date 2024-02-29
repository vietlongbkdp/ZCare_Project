import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import './custom.css'
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Pagination, Typography } from "@mui/material";
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

function AppointmentSchedule() {
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const { API } = useContext(ApiContext)
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const [bookingCustomer, setbookingCustomer] = useState([]);
    const [filteredBooking, setFilteredBooking] = useState([]);
    const userId = Cookies.get('userId');

    useEffect(() => {
        axios.get(`${API}/api/booking`)
            .then(response => {
                const sortedData = response.data.sort((a, b) => b.id - a.id);
                setbookingCustomer(sortedData);
                setFilteredBooking(sortedData);
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

    const handleClickView = (idBooking) => {
        bookingCustomer.forEach((item) => {
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
        bookingCustomer.forEach((item) => {
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

    const currentCustomerBookingList = filteredBooking.slice(startIndex, endIndex);

    return (
        <div>
            <Typography variant='h5' align='center'>LỊCH SỬ KHÁM BỆNH TRÊN HỆ THỐNG</Typography>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginTop: '10px' }}>
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
                            <StyledTableCell>Ngày khám</StyledTableCell>
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
                                    </div>) : "Chưa có kết quả"}</StyledTableCell>
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
                            <p className="d-flex justify-content-center" style={{ color: "red", marginTop: '12px', marginLeft: '10px' }}>
                                Không có lịch sử khám bệnh!
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