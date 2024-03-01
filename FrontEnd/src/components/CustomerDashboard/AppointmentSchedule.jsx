import React, {useContext, useEffect, useState} from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import './custom.css'
import { toast } from 'react-toastify';
import Loading from "../Loading/Loading";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { saveAs } from 'file-saver';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
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
    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(true);
    const UserId = Cookies.get('userId');
    const location = useLocation();
    const navigate = useNavigate();
    const { API } = useContext(ApiContext)
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const toastSuccessMessage = searchParams.get('toastSuccessMessage');
        const toastErrorMessage = searchParams.get('toastErrorMessage')
        if (toastSuccessMessage) {
            toast.success(toastSuccessMessage);
        }
        if (toastErrorMessage) {
            toast.error(toastErrorMessage)
        }
    }, [location.search]);

    useEffect(() => {
        axios.get(`${API}/api/booking/${UserId}`)
            .then(response => {
                const sortedData = response.data.sort((a, b) => b.id - a.id);
                setBooking(sortedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [UserId]);
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
    const handleClickRating =(idDoctor)=>{
        navigate(`/doctorDetail/${idDoctor}`);

    }
    return (
        <div>
            {loading && <Loading />}
            <Header />
            <div className="d-flex justify-content-center align-items-center"
                style={{ backgroundColor: "rgb(237 255 250)", height: "150px" }}>
                <h2>THÔNG TIN LỊCH HẸN</h2>
            </div>
            <div className={"container justify-content-center mt-3 mb-5"}>
                <Link to='/home' className="d-flex" style={{ textDecoration: 'none' }}>
                    <span className="me-2"><i className="fa-solid fa-house"></i></span>
                    /
                    <p className="ms-2">Lịch đã hẹn</p>
                </Link>
                <h4>Lịch hẹn đã đặt</h4>
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
                                <StyledTableCell>Đánh giá</StyledTableCell>
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
                                            <p>Giới tính: {booking?.customer?.gender} </p>
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
                                                    } else if (booking?.status === "CANCEL") {
                                                        return "Đã hủy";
                                                    }
                                                })()
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {booking?.status === "PAID" ? (
                                                <button
                                                    type="button"
                                                    className="btn btn-success"
                                                    style={{
                                                        width: "100px",
                                                        height: '30px',
                                                        fontSize: 'small',
                                                        marginBottom: "10px"
                                                    }}
                                                    onClick={() => {
                                                        handleClickRating(booking.doctor.id);
                                                    }}
                                                >
                                                    Đánh giá
                                                </button>
                                            ) : (
                                                <span>Bạn cần thanh toán để đánh giá</span>
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell>{dayjs(booking.createAt).format("DD/MM/YYYY")}</StyledTableCell>
                                    </StyledTableRow>
                                ))
                            ) : (
                                <p className="d-flex justify-content-center" style={{color: "red"}}>
                                    Bạn chưa đặt lịch hẹn trên trình duyệt này!
                                </p>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Footer />
        </div>
    );
}

export default AppointmentSchedule;