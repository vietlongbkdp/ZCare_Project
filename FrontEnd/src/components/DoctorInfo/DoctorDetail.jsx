import React, {useContext, useEffect, useState} from 'react';
import {FormControl, InputLabel, Link, MenuItem, Select} from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Doctorinfo.css"
import axios from "axios";
import { parse } from 'date-fns';
import dayjs from "dayjs";
import Loading from "../Loading/Loading";
import {ApiContext} from "../ApiContext/ApiProvider";

function DoctorDetail() {
    const  dateNows = dayjs().format('D/M/YYYY')
    const parsedDate = parse(dateNows, 'd/M/yyyy', new Date()).toLocaleDateString('vi-VN', { weekday: 'long' });
    const [currentDate, setCurrentDate] = useState(new Date());
    const [recentDates, setRecentDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedWeekday, setSelectedWeekday] = useState(parsedDate);
    const [scheduleList, setScheduleList] = useState([]);
    const [doctorInfo, setDoctorInfo] = useState('');
    const [loading, setLoading] = useState(true);
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


    const doctorId = 1;

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
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error fetching schedule data:', error);
                setLoading(false)
            }
        };

        fetchDoctorInfo();
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
            {loading && <Loading/>}
            <Header/>
            <div className={"w-100 d-flex flex-column justify-content-center align-items-center"} style={{height:"200px" ,backgroundColor: "rgb(237 255 250)"}}>
                    <h2 className={" mt-2"}>{doctorInfo?.doctorName}</h2>
                    <p className={" mt-3"}>{ doctorInfo?.speciality?.specialtyName}</p>
            </div>

            <div className={"container mt-3"}>
                    <div className={"d-flex "}>
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src={doctorInfo?.avatarImg}
                                     alt={""}
                                     className="rounded-circle" style={{width: "200px"}}/>
                            </div>
                        </div>
                        <div className={"d-flex flex-column justify-content-center ms-3"}>
                            <div>
                                <h2>{doctorInfo?.doctorName}</h2>
                            </div>
                            <div className={"d-flex flex-column "}>
                                <div className={"d-flex "}>
                                <div className={"d-flex me-2 mt-4"}>
                                    <span className={"me-2"}><i className="fa-regular fa-calendar-days"></i></span>
                                    <h5>Lịch khám</h5>
                                </div>
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
                                </div>
                                <div className={"d-flex flex-wrap gap-3"}>
                                    {scheduleList.map((schedule, index) => (
                                        <Link key={schedule.id} to={`/booking/${schedule.id}/${selectedDate}`} className="schedule">
                                            {schedule?.timeItem}
                                        </Link>
                                    ))}
                                </div>
                                <div className={"d-flex mt-3"}>
                                    <span className={"me-2"}><i className="fa-solid fa-tag"></i></span>
                                    <p>THÔNG TIN</p>
                                </div>
                                <div className={"d-flex"}>
                                    <div className={"d-flex flex-column col-6"}>
                                        <div className={"d-flex"}>
                                            <p className={"fw-bold me-5"}>Chức vụ:</p>
                                            {doctorInfo?.position?.name}
                                        </div>
                                        <div className={"d-flex"}>
                                            <p className={"fw-bold me-3"}>Phòng khám:</p>
                                            {doctorInfo?.clinic?.clinicName}
                                        </div>
                                        <div className={"d-flex"}>
                                            <p className={"fw-bold me-3"}>Chuyên khoa:</p>
                                            {doctorInfo?.speciality?.specialtyName}
                                        </div>
                                        <div className={"d-flex"}>
                                            <p className={"fw-bold me-4"}>Ngày Sinh:</p>
                                            {doctorInfo?.dob}
                                        </div>
                                    </div>
                                    <div className={"d-flex flex-column col-6"}>
                                        <div className={"d-flex"}>
                                            <p className={"fw-bold me-5"}>Địa chỉ:</p>
                                            {doctorInfo?.clinic?.address}
                                        </div>
                                        <div className={"d-flex"}>
                                            <p className={"fw-bold me-3"}>Email:</p>
                                            {doctorInfo?.email}
                                        </div>
                                        <div className={"d-flex"}>
                                            <p className={"fw-bold me-3"}>Phone:</p>
                                            {doctorInfo?.phone}
                                        </div>
                                    </div>
                                </div>
                                <div className={"d-flex mt-3"}>
                                    <span className={"me-2"}><i className="fa-solid fa-tag"></i></span>
                                    <p>GÍA KHÁM: </p>
                                    <p className={"fw-bold"}> {doctorInfo && doctorInfo.fee ? (doctorInfo.fee * 1000).toLocaleString() + " đ" : ""}</p>
                                </div>
                            </div>
                        </div>

                    </div>


            </div>
            <Footer/>
        </>
    );
}

export default DoctorDetail;