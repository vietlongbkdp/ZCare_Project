import React, { useContext, useEffect, useState } from 'react';
import "./DoctorInfoClinic.css"
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import dayjs from "dayjs";
import { format, parse } from "date-fns";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import {ApiContext} from "../ApiContext/ApiProvider";
import Rating from "@mui/material/Rating";

function DoctorComponentAdmin({ doctor }) {
    const dateNows = dayjs().format('D/M/YYYY');
    const parsedDate = parse(dateNows, 'd/M/yyyy', new Date()).toLocaleDateString('vi-VN', { weekday: 'long' });
    const [currentDate, setCurrentDate] = useState(new Date());
    const [recentDates, setRecentDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dateNows);
    const [selectedWeekday, setSelectedWeekday] = useState(parsedDate);
    const [scheduleList, setScheduleList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const { API } = useContext(ApiContext)
    const formatTime = (date) => {
        return format(date, 'HH:mm');
    };
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 10000);

        return () => {
            clearInterval(timer);
        };
    }, []);
    const convertStringDetailToNumDetail = (timeItem) => {
        const [startTime, endTime] = timeItem.split(' - ');
        const [startHour, startMinute] = startTime.split(':').map(Number);
        return [startHour, startMinute];
    };
    const compareStartTime = (a, b) => {
        const startTimeA = convertStringDetailToNumDetail(a.timeItem);
        const startTimeB = convertStringDetailToNumDetail(b.timeItem);
        if (startTimeA[0] < startTimeB[0] || (startTimeA[0] === startTimeB[0] && startTimeA[1] < startTimeB[1])) {
            return -1;
        } else if (startTimeA[0] > startTimeB[0] || (startTimeA[0] === startTimeB[0] && startTimeA[1] > startTimeB[1])) {
            return 1;
        } else {
            return 0;
        }
    };
    const filterAndRenderSchedule = (scheduleList) => {
        const currentTime = convertStringDetailToNumDetail(formatTime(new Date()));
        const filteredList = selectedWeekday === parsedDate ? scheduleList.filter((schedule) => {
            const startTimeA = convertStringDetailToNumDetail(schedule.timeItem);
            return (
                startTimeA[0] > currentTime[0] ||
                (startTimeA[0] === currentTime[0] && startTimeA[1] > currentTime[1])
            );
        }) : scheduleList;
        return filteredList;
    };
    const sortObjectsByStartTime = (objectsList) => {
        return objectsList.sort(compareStartTime);
    };
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
            const response = await axios.get(`${API}/api/schedule/${doctor.id}/${selectedWeekday}`);
            if (response.status === 200) {
                const sortedScheduleList = sortObjectsByStartTime(response.data);
                const filteredList = filterAndRenderSchedule(sortedScheduleList);
                setScheduleList(filteredList);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching schedule data:', error);
            setLoading(false);
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
        <>
            {loading && <Loading />}
            <div key={doctor.id} className={"container d-flex mt-2 rounded border shadow-sm row col-9 p-4 mx-auto"} style={{ backgroundColor: "white" }}>
                <div className={"d-flex mt-2 "}>
                    <div className={"d-flex flex-column justify-content-around col-6 border-end"}>
                        <div className={"d-flex justify-content-start mb-auto"}>
                            <div className={"col-sm-2"}>
                                <div className="avatar">
                                    <div className="w-24 rounded">
                                        <img
                                            src={doctor?.avatarImg}
                                            alt={""}
                                            style={{ width: "70px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={"d-flex flex-column justify-content-center ms-3"}>
                                <div>
                                    <h5 style={{ color: "#74b9ff" }}>{doctor?.doctorName}</h5>
                                </div>
                                <div>
                                    <p>Chức danh: {doctor?.position?.name}</p>
                                    <p>Chuyên khoa: {doctor?.speciality?.specialtyName}</p>
                                    <p>Đánh giá:
                                        <Rating value={doctor?.star} max={5} name="half-rating" precision={0.5} readOnly />
                                    </p>
                                </div>
                                <div className={"d-flex"}>
                                    <span className={"me-2"}><i className="fa-solid fa-location-dot"></i></span>
                                    <h6>Hồ Chí Minh</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"d-flex flex-column ms-4 col-6"}>
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
                                    {recentDates.map((date, index) => (
                                        <MenuItem
                                            key={index}
                                            value={date.toLocaleDateString()}
                                            selected={currentDate.toLocaleDateString() === date.toLocaleDateString()}
                                        >
                                            {`${date.toLocaleDateString()} (${date.toLocaleDateString('vi-VN', { weekday: 'long' })})`}
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
                                <Link key={schedule.id} to={`/clinicadmin/bookingAdmin/${schedule.id}/${selectedDate}`} className="schedule">
                                    {schedule.timeItem}
                                </Link>
                            ))}
                        </div>
                        <div className={"d-flex mt-2"}>
                            <div>Chọn </div>
                            <div>
                                <span className={"mx-2"}><i className="fa-regular fa-hand-pointer"></i></span>
                            </div>
                            <div> và đặt (Phí đặt lịch 0đ)</div>
                        </div>
                        <div className={"d-flex flex-column border-top border-bottom mt-3 py-2"}>
                            <div>ĐỊA CHỈ KHÁM</div>
                            <div className={"fw-bold"}>{doctor?.clinic?.clinicName}</div>
                            <div>{doctor?.clinic?.address}</div>
                        </div>
                        <div className={"d-flex mt-3 border-bottom py-3"}>
                            <div className={"me-2"}>Giá Khám: {doctor && doctor.fee ? (doctor.fee * 1000).toLocaleString() + " đ" : ""}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorComponentAdmin;