import React, {useContext, useEffect, useState} from 'react';
import Cookies from "js-cookie";
import axios from "axios";
import dayjs from "dayjs";
import { FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableContainer, TableHead, Typography } from "@mui/material";
import { parse } from "date-fns";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
function MedicalBookingList() {
    const [booking, setBooking] = useState([]);
    const [pre, setPre] = useState(true);
    const dateNows = dayjs().format('D/M/YYYY');
    const parsedDate = parse(dateNows, 'd/M/yyyy', new Date()).toLocaleDateString('vi-VN', { weekday: 'long' });
    const [currentDate, setCurrentDate] = useState(new Date());
    const [recentDates, setRecentDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dateNows);
    const [selectedWeekday, setSelectedWeekday] = useState(parsedDate);
    const { API } = useContext(ApiContext)
    const userId = Cookies.get('userId');
    const statusColors = {
        CUSTOMERCONFIMED: "green",
        EXAMINING: "blue",
        CANCEL: "red",
    };

    useEffect(() => {
        axios.get(`${API}/api/booking/${userId}/${selectedDate}`)
            .then(response => {
                const sortedData = response.data.sort((a, b) => b.id - a.id);
                setBooking(sortedData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [userId, pre, selectedDate]);

    useEffect(() => {
        setCurrentDate(new Date());
        const getRecentDates = () => {
            const today = new Date();
            const recentDates = [];
            for (let i = 0; i < 6; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                recentDates.push(date);
            }
            setRecentDates(recentDates);
        };
        getRecentDates();
    }, []);

    useEffect(() => {
        if (selectedDate !== '') {
            const selected = new Date(selectedDate);
            setCurrentDate(selected);
        }
    }, [selectedDate]);

    const handleChangeStatus = (bookingId, event) => {
        const selectedStatus = event.target.value;
        const selectElement = event.target;
        selectElement.style.backgroundColor = statusColors[selectedStatus];
        const data = {
            bookingId,
            selectedStatus
        }
        axios.post(`${API}/api/booking/changeStatus`, data)
            .then(response => {
                setBooking(response.data);
                setPre(!pre);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleDateChange = (event) => {
        const dateValue = event.target.value;
        setSelectedDate(dateValue);
        const parsedDate = parse(dateValue, 'd/M/yyyy', new Date());
        const selectedWeekday = parsedDate.toLocaleDateString('vi-VN', { weekday: 'long' });
        setSelectedWeekday(selectedWeekday);
    };
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
        <div>
            <Typography variant='h5' align='center'>DANH SÁCH ĐẶT KHÁM</Typography>

            <div>
                <FormControl required variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="recent-dates-label">Ngày</InputLabel>
                    <Select
                        style={{ color: "#0097e6" }}
                        labelId="recent-dates-label"
                        id="date"
                        value={selectedDate || currentDate.toLocaleDateString()}
                        onChange={handleDateChange}
                        label="Ngày"
                    >
                        {recentDates.map((date, index) => (<MenuItem
                            key={index}
                            value={date.toLocaleDateString()}
                            selected={currentDate.toLocaleDateString() === date.toLocaleDateString()}
                        >
                            {`${date.toLocaleDateString()} (${date.toLocaleDateString('vi-VN', { weekday: 'long' })})`}
                        </MenuItem>))}
                    </Select>
                </FormControl>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table" key={booking.id}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell >STT</StyledTableCell>
                            <StyledTableCell >Thông tin bác sĩ</StyledTableCell>
                            <StyledTableCell >Thông tin bệnh nhân</StyledTableCell>
                            <StyledTableCell >Ngày khám</StyledTableCell>
                            <StyledTableCell>Thời gian</StyledTableCell>
                            <StyledTableCell>Giá</StyledTableCell>
                            <StyledTableCell>Kết quả</StyledTableCell>
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
                                            <select
                                                style={{
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    backgroundColor: statusColors[booking?.status],
                                                    color: 'white',
                                                    padding: 3,
                                                    appearance: 'none',
                                                    WebkitAppearance: 'none',
                                                    MozAppearance: 'none',
                                                    textAlign: 'center',
                                                }}
                                                value={booking?.status}
                                                onChange={(event) => {
                                                    handleChangeStatus(booking?.id, event)
                                                }}
                                            >
                                                <option value="CUSTOMERCONFIMED"
                                                        style={{backgroundColor: 'white', color: 'black'}}>Đã xác nhận
                                                </option>
                                                {(selectedDate === dateNows) ? (<option value="EXAMINING"
                                                                                    style={{
                                                                                        backgroundColor: 'white',
                                                                                        color: 'black'
                                                                                    }}>Đang khám
                                                                            </option>) : ""}
                                                <option value="CANCEL"
                                                        style={{backgroundColor: 'white', color: 'black'}}>Đã
                                                    hủy
                                                </option>
                                            </select>
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell>{dayjs(booking.createAt).format("DD/MM/YYYY")}</StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <p className="d-flex justify-content-center" style={{ color: "red", marginTop: '12px', marginLeft: '10px' }}>
                                Hôm nay chưa có lịch hẹn khám!
                            </p>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default MedicalBookingList;