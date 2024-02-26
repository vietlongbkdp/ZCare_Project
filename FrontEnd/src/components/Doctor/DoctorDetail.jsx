import React, {useContext, useEffect, useState} from 'react';
import { Button, FormControl, InputLabel, Link, MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";
import { parse } from "date-fns";
import axios from "axios";
import HTMLReactParser from "html-react-parser";
import { useLocation } from 'react-router-dom';
import Loading from "../Loading/Loading";
import {ApiContext} from "../ApiContext/ApiProvider";

export default function DoctorDetail({ doctorId, setShowDoctorDetail, handleShowDoctorInClinic, setShowDoctorList }) {
    const dateNows = dayjs().format('D/M/YYYY')
    const parsedDate = parse(dateNows, 'd/M/yyyy', new Date()).toLocaleDateString('vi-VN', { weekday: 'long' });
    const [currentDate, setCurrentDate] = useState(new Date());
    const [recentDates, setRecentDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedWeekday, setSelectedWeekday] = useState(parsedDate);
    const [scheduleList, setScheduleList] = useState([]);
    const [doctorInfo, setDoctorInfo] = useState('');
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { API } = useContext(ApiContext)
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
            setLoading(false)
        };
        getRecentDates();
    }, []);

    useEffect(() => {
        const fetchDoctorInfo = async () => {
            try {
                const response = await axios.get(`${API}/api/doctor/` + doctorId);
                if (response.status === 200) {
                    setDoctorInfo(response.data);
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error fetching doctor info:', error);
                setLoading(false)
            }
        };

        const fetchScheduleData = async () => {
            try {
                const response = await axios.get(`${API}/api/schedule/${doctorId}/${selectedWeekday}`);
                if (response.status === 200) {
                    setScheduleList(response.data);
                }
            } catch (error) {
                console.error('Error fetching schedule data:', error);
            }
        };
        fetchDoctorInfo();
        fetchScheduleData();
    }, [doctorId, selectedWeekday]);

    const handleDateChange = (event) => {
        const dateValue = event.target.value;
        setSelectedDate(dateValue);
        const parsedDate = parse(dateValue, 'd/M/yyyy', new Date());
        const selectedWeekday = parsedDate.toLocaleDateString('vi-VN', { weekday: 'long' });
        setSelectedWeekday(selectedWeekday);
    };

    const handleHideDoctorDetail = () => {
        if (location.pathname === '/admin/clinic' || location.pathname === '/clinicadmin/doctor') {
            handleShowDoctorInClinic();
        }
        else {
            setShowDoctorList(true)
        }
        setShowDoctorDetail(false);
    }

    useEffect(() => {
        if (selectedDate !== '') {
            const selected = new Date(selectedDate);
            setCurrentDate(selected);
        }
    }, [selectedDate]);

    return (
        <>
            {loading && <Loading/>}
            <Button
                type="button"
                variant="contained"
                sx={{ mb: 3, mr: 1, backgroundColor: 'grey', '&:hover': { backgroundColor: 'gray' } }}
                onClick={handleHideDoctorDetail}
            >
                Trở lại
            </Button>
            <div className={"container-fluid border-bottom bg-light"}>
                <div className={"container p-4 "}>
                    <div className={"d-flex "}>
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src={doctorInfo?.avatarImg} alt="" className="rounded-circle" style={{ width: "100px", height: '100px' }} />
                            </div>
                        </div>
                        <div className={"d-flex flex-column justify-content-center col-7 ms-3"}>
                            <div>
                                <h3>{doctorInfo?.doctorName} </h3>
                            </div>
                            <div className={""}>
                                <p>Chức danh: {doctorInfo?.position?.name}</p>
                                <p>Chuyên khoa: {doctorInfo?.speciality?.specialtyName}</p>
                            </div>
                            <div className={"d-flex"}>
                                <span className={"me-2"}><i className="fa-solid fa-location-dot"></i></span>
                                <h6>Hồ Chí Minh</h6>
                            </div>
                        </div>
                    </div>
                    <div className={"d-flex mt-5"}>
                        <div className={"d-flex flex-column col-6 border-end"}>
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
                                    <Link key={schedule.id} to="/" className="schedule">
                                        {schedule?.timeItem}
                                    </Link>
                                ))}
                            </div>
                            <div className={"d-flex mt-2"}>
                                <div>Chọn</div>
                                <div>
                                    <span className={"mx-2"}><i className="fa-regular fa-hand-pointer"></i></span>
                                </div>
                                <div> và đặt (Phí đặt lịch 0đ)</div>
                            </div>
                        </div>
                        <div className={"d-flex flex-column col-6 ms-3"}>
                            <div className={"d-flex flex-column border-bottom mt-3 py-2"}>
                                <div>ĐỊA CHỈ KHÁM</div>
                                <div className={"fw-bold"}>{doctorInfo?.clinic?.clinicName}</div>
                                <div>{doctorInfo?.clinic?.address}</div>
                            </div>
                            <div className={"d-flex mt-3  "}>
                                <div className={"me-2"}>Giá Khám: {doctorInfo && doctorInfo.fee ? (doctorInfo.fee * 1000).toLocaleString() + " đ" : ""}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"container-fluid border-bottom"} style={{ backgroundColor: "rgb(248 250 250)" }}>
                <div className={"container p-4"}>
                    <div className={"d-flex flex-column mt-3"}>
                        {doctorInfo && doctorInfo?.doctorInfo && HTMLReactParser(doctorInfo?.doctorInfo)}
                    </div>
                </div>
            </div>
        </>
    );
}
