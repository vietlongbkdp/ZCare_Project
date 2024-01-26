import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import "./Doctorinfo.css"
import dayjs from "dayjs";
import {parse} from "date-fns";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Rating from '@mui/material/Rating';
import RatingDoctor from "../RatingDoctor/RatingDoctor";

function DoctorInfo() {
    const dateNows = dayjs().format('D/M/YYYY')
    const parsedDate = parse(dateNows, 'd/M/yyyy', new Date()).toLocaleDateString('vi-VN', {weekday: 'long'});
    const [currentDate, setCurrentDate] = useState(new Date());
    const [recentDates, setRecentDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedWeekday, setSelectedWeekday] = useState(parsedDate);
    const [scheduleList, setScheduleList] = useState([]);
    const [doctorInfo, setDoctorInfo] = useState('');
    const [ratingList, setRatingList] = useState([]);
    const [ratingSubmitted, setRatingSubmitted] = useState(false);
    const {doctorId} = useParams();
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
        const fetchDoctorInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/doctor/' + doctorId);
                if (response.status === 200) {
                    setDoctorInfo(response.data);
                }
            } catch (error) {
                console.error('Error fetching doctor info:', error);
            }
        };

        const fetchScheduleData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/schedule/${doctorId}/${selectedWeekday}`);
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
        const selectedWeekday = parsedDate.toLocaleDateString('vi-VN', {weekday: 'long'});
        setSelectedWeekday(selectedWeekday);

    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/rating/${doctorId}`)
            .then(response => {
                setRatingList(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [doctorId,ratingSubmitted]);


    useEffect(() => {
        if (selectedDate !== '') {
            const selected = new Date(selectedDate);
            setCurrentDate(selected);
        }
    }, [selectedDate]);

    return (<>
        <Header/>
        <div className="w-100" >
            <div className="d-flex justify-content-center align-items-center" style={{backgroundColor: "rgb(237 255 250)",height:"150px"}}>
                <h2>THÔNG TIN BÁC SỸ</h2>
            </div>

            <div className={"container-fluid"}>
                <div className={"container pb-4 "}>
                    <div className={"d-flex mt-5"}>
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src={doctorInfo?.avatarImg}
                                     alt={""}
                                     className="rounded-circle" style={{width: "100px"}}/>
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
                            <div className={"d-flex mt-3"}>
                                <span className={"me-2"}><i className="fa-regular fa-calendar-days"></i></span>
                                <h5>Lịch khám</h5>
                            </div>
                            <div className={"d-flex flex-wrap gap-3"}>
                                {scheduleList.map((schedule, index) => (
                                    <Link key={schedule.id}  to={`/booking/${schedule.id}/${selectedDate}`} className="schedule">
                                        {schedule?.timeItem}
                                    </Link>))}
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
                                <div className={"me-2"}>Giá Khám: {doctorInfo?.fee}.000đ</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"container-fluid border-bottom mt-3"} style={{backgroundColor: "rgb(248 250 250)"}}>
                <div className={"container pb-4"}>
                    <div className={"d-flex flex-column pt-4"}>
                        {doctorInfo && doctorInfo.doctorInfo && HTMLReactParser(doctorInfo.doctorInfo)}
                    </div>
                </div>
            </div>
            <div className={"container"}>
                <div className={"d-flex flex-column"}>
                    <div>
                        <h5 className={"mt-4 border-bottom py-3"}>Phản hồi của bệnh nhân sau khi đi khám</h5>
                    </div>
                    {ratingList.map((rating, index) => (<>
                        <div> <Rating value={rating?.star} max={5} readOnly /></div>
                        <div key={rating.id} className="d-flex ">
                            <div className="me-1">{rating?.customer?.fullName}</div>
                            <span style={{color: "#48dbfb"}}>
                                <i className="fa-regular fa-circle-check"></i>
                                </span>
                            <span className="ms-2" style={{color: "#48dbfb"}}>
                               đã khám ngày {rating?.createAt}
                                 </span>
                        </div>
                        <div className="border-bottom py-3">{rating?.comment}</div>
                    </>))}
                    <div className={"mt-3 pb-3"}>
                        <RatingDoctor doctorId={doctorId} setRatingSubmitted={setRatingSubmitted}/>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>);
}

export default DoctorInfo;