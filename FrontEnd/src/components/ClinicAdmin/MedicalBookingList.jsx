import React, {useEffect, useState} from 'react';
import Cookies from "js-cookie";
import axios from "axios";
import dayjs from "dayjs";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {parse} from "date-fns";

function MedicalBookingList() {
    const [booking, setBooking] = useState([]);
    const [pre,setPre] = useState(true);
    const dateNows = dayjs().format('D/M/YYYY');
    const parsedDate = parse(dateNows, 'd/M/yyyy', new Date()).toLocaleDateString('vi-VN', { weekday: 'long' });
    const [currentDate, setCurrentDate] = useState(new Date());
    const [recentDates, setRecentDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dateNows);
    const [selectedWeekday, setSelectedWeekday] = useState(parsedDate);
    const userId = Cookies.get('userId');
    const statusColors = {
        CUSTOMERCONFIMED: "green",
        EXAMINING: "blue",
        RESULTING: "purple",
        PAID: "orange",
        CANCEL: "red",
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/booking/adminClinic/${userId}`)
            .then(response => {
                setBooking(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [userId,pre]);

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

    const handleChangeStatus = (bookingId,event) => {
        const selectedStatus = event.target.value;
        const selectElement = event.target;
        selectElement.style.backgroundColor = statusColors[selectedStatus];
       const data={
           bookingId,
           selectedStatus
       }
        axios.post('http://localhost:8080/api/booking/changeStatus',data)
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
        const selectedWeekday = parsedDate.toLocaleDateString('vi-VN', {weekday: 'long'});
        setSelectedWeekday(selectedWeekday);

        // axios.post('http://localhost:8080/api/booking/changeStatus',data)
        //     .then(response => {
        //         setBooking(response.data);
        //         setPre(!pre);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });

    };

    return (
        <div>
            <div>
                <FormControl required variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="recent-dates-label">Ngày</InputLabel>
                    <Select
                        style={{color: "#0097e6"}}
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
                            {`${date.toLocaleDateString()} (${date.toLocaleDateString('vi-VN', {weekday: 'long'})})`}
                        </MenuItem>))}
                    </Select>
                </FormControl>
            </div>
            <div className={"container justify-content-center"}>
                <table className="table table-bordered table-striped" key={booking.id}>
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
                    {booking.length > 0 ? (
                        booking.map((booking, index) => (
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
                                <td>{booking?.result?.file ? booking?.result?.file : "Chưa có kết quả"}</td>
                                <td>
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
                                            <option value="EXAMINING"
                                                    style={{backgroundColor: 'white', color: 'black'}}>Đang khám
                                            </option>
                                            <option value="RESULTING"
                                                    style={{backgroundColor: 'white', color: 'black'}}>Đã trả kết quả
                                            </option>
                                            <option value="PAID" style={{backgroundColor: 'white', color: 'black'}}>Đã
                                                Thanh toán
                                            </option>
                                            <option value="CANCEL" style={{backgroundColor: 'white', color: 'black'}}>Đã
                                                hủy
                                            </option>
                                        </select>
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
            </div>
        </div>
    );
}

export default MedicalBookingList;