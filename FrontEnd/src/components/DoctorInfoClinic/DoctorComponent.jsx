import React, { useEffect, useState } from 'react';
import "./DoctorInfoClinic.css"
import { Link } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import dayjs from "dayjs";
import { parse } from "date-fns";
import axios from "axios";
import DoctorInfoClinic from "./DoctorInfoClinic";

function DoctorComponent({ doctor }) {
    const dateNows = dayjs().format('D/M/YYYY');
    const parsedDate = parse(dateNows, 'd/M/yyyy', new Date()).toLocaleDateString('vi-VN', { weekday: 'long' });
    const [currentDate, setCurrentDate] = useState(new Date());
    const [recentDates, setRecentDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedWeekday, setSelectedWeekday] = useState(parsedDate);
    const [scheduleList, setScheduleList] = useState([]);

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

    const fetchScheduleData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/schedule/${doctor.id}/${selectedWeekday}`);
            if (response.status === 200) {
                setScheduleList(response.data);
            }
        } catch (error) {
            console.error('Error fetching schedule data:', error);
        }
    };

    useEffect(() => {
        fetchScheduleData();
    }, [selectedWeekday]);

    const handleDateChange = (event) => {
        const dateValue = event.target.value;
        setSelectedDate(dateValue);
        const parsedDate = parse(dateValue, 'd/M/yyyy', new Date());
        const selectedWeekday = parsedDate.toLocaleDateString('vi-VN', { weekday: 'long' });
        setSelectedWeekday(selectedWeekday);
    };

    useEffect(() => {
        if (selectedDate !== '') {
            const selected = new Date(selectedDate);
            setCurrentDate(selected);
        }
    }, [selectedDate]);

    return (
        <div key={doctor.id} className={"container d-flex mt-2 rounded border shadow-sm col-9 p-4"}>
            <div className={"d-flex mt-2"}>
                <div className={"d-flex flex-column justify-content-around col-6 border-end"}>
                    <div className={"d-flex justify-content-start mb-auto"}>
                        <div className={"col-sm-2"}>
                            <div className="avatar">
                                <div className="w-24 rounded">
                                    <img
                                        src={doctor?.avatarImg}
                                        alt={""}
                                        style={{width: "70px"}}
                                    />
                                </div>
                            </div>
                            <Link to="/">Xem thêm</Link>
                        </div>
                        <div className={"d-flex flex-column justify-content-center ms-3"}>
                            <div>
                                <h5 style={{color: "#74b9ff"}}>{doctor?.doctorName}</h5>
                            </div>
                            <div>
                                <h6>{doctor?.doctorInfo}</h6>
                            </div>
                            <div className={"d-flex"}>
                                <span className={"me-2"}><i className="fa-solid fa-location-dot"></i></span>
                                <h6>Hà Nội</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"d-flex flex-column ms-4 col-6"}>
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
                                {recentDates.map((date, index) => (
                                    <MenuItem
                                        key={index}
                                        value={date.toLocaleDateString()}
                                        selected={currentDate.toLocaleDateString() === date.toLocaleDateString()}
                                    >
                                        {`${date.toLocaleDateString()} (${date.toLocaleDateString('vi-VN', {weekday: 'long'})})`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className={"d-flex mt-3"}>
                        <span className={"me-2"}><i className="fa-regular fa-calendar-days"></i></span>
                        <h5>Lịch khám</h5>
                    </div>
                    <div className={"d-flex flex-wrap gap-3"}>
                        {scheduleList.map((schedule, index) => (
                            <Link key={schedule.id} to="/" className="schedule">
                                {schedule.timeItem}
                            </Link>
                        ))}
                    </div>
                    <div className={"d-flex mt-2"}>
                        <div>Chọn</div>
                        <div>
                            <span><i className="fa-regular fa-hand-pointer"></i></span>
                        </div>
                        <div> và đặt (Phí đặt lịch 0đ)</div>
                    </div>
                    <div className={"d-flex flex-column border-top border-bottom mt-3 py-2"}>
                        <div>ĐỊA CHỈ KHÁM</div>
                        <div className={"fw-bold"}>{doctor?.clinic?.clinicName}</div>
                        <div>{doctor?.clinic?.address}</div>
                    </div>
                    <div className={"d-flex mt-3 border-bottom py-3"}>
                        <div className={"me-2"}>Giá Khám: {doctor?.fee}.000đ</div>
                        <Link to="/">Xem chi tiết</Link>
                    </div>
                    <div className={"d-flex mt-3"}>
                        <div className={"me-2"}>Loại bảo hiểm áp dụng:</div>
                        <Link to="/">Xem chi tiết</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorComponent;