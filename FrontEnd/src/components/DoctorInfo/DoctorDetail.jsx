import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, Link, MenuItem, Select} from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function DoctorDetail() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [recentDates, setRecentDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        setCurrentDate(new Date());
        const getRecentDates = () => {
            const today = new Date();
            const recentDates = [];
            for (let i = 0; i < 3; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                recentDates.push(date);
            }
            setRecentDates(recentDates);
        };
        getRecentDates();
    }, []);
    const handleChange = (event) => {
        setSelectedDate(event.target.value);
    };
    useEffect(() => {
        if (selectedDate !== '') {
            const selected = new Date(selectedDate);
            setCurrentDate(selected);
        }
    }, [selectedDate]);

    return (
        <>
            <Header/>
            <div className={"w-100 d-flex flex-column justify-content-center align-items-center"} style={{height:"200px" ,backgroundColor: "rgb(237 255 250)"}}>
                    <h2 className={" mt-2"}>NGUYỄN DUY HƯNG</h2>
                    <p className={" mt-3"}>Tai mũi họng</p>
            </div>

            <div className={"container mt-3"}>
                    <div className={"d-flex "}>
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                     alt={""}
                                     className="rounded-circle" style={{width: "200px"}}/>
                            </div>
                        </div>
                        <div className={"d-flex flex-column justify-content-center ms-3"}>
                            <div>
                                <h2>Nguyễn Duy Hưng</h2>
                            </div>
                            <div className={"d-flex flex-column "}>
                                <div className={"d-flex "}>
                                <div className={"d-flex me-2 mt-4"}>
                                    <span className={"me-2"}><i className="fa-regular fa-calendar-days"></i></span>
                                    <h5>Lịch khám</h5>
                                </div>
                                <div>
                                    <FormControl required variant="standard" sx={{m: 1, minWidth: 120}}>
                                        <InputLabel id="recent-dates-label">Ngày</InputLabel>
                                        <Select
                                            style={{color: "#0097e6"}}
                                            labelId="recent-dates-label"
                                            id="recent-dates-select"
                                            value={selectedDate || currentDate.toLocaleDateString()}
                                            onChange={handleChange}
                                            label="Ngày"
                                        >
                                            {recentDates.map((date, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={date.toLocaleDateString()}
                                                    selected={currentDate.toLocaleDateString() === date.toLocaleDateString()}
                                                >
                                                    {date.toLocaleDateString()}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                </div>
                                <div className={"d-flex flex-wrap gap-3"}>
                                    <Link to="/" className="schedule ">10:30 - 12:00</Link>
                                    <Link to="/" className="schedule ">13:20 - 14:00</Link>
                                    <Link to="/" className="schedule ">14:10 - 14:40</Link>
                                    <Link to="/" className="schedule ">15:00 - 15:30</Link>
                                    <Link to="/" className="schedule ">15:45 - 16:00</Link>
                                    <Link to="/" className="schedule ">16:10 - 16:35</Link>
                                    <Link to="/" className=" schedule ">17:00 - 17:30</Link>
                                </div>
                                <div className={"d-flex mt-3"}>
                                    <span className={"me-2"}><i className="fa-solid fa-tag"></i></span>
                                    <p>THÔNG TIN</p>
                                </div>
                                <div className={"d-flex"}>
                                    <div className={"d-flex flex-column col-6"}>
                                        <div className={"d-flex"}>
                                            <p className={"fw-bold me-5"}>Chức vụ:</p>
                                            Bác sĩ
                                        </div>
                                        <div className={"d-flex"}>
                                            <p className={"fw-bold me-3"}>Phòng khám:</p>
                                            Tai mũi họng
                                        </div>
                                        <div className={"d-flex"}>
                                            <p className={"fw-bold me-3"}>Chuyên khoa:</p>
                                            Hệ thống Y tế MEDLATEC
                                        </div>
                                        <div className={"d-flex"}>
                                            <p className={"fw-bold me-4"}>Ngày Sinh:</p>
                                            2023-04-06
                                        </div>
                                    </div>
                                    <div className={"d-flex flex-column col-6"}>
                                        <div className={"d-flex"}>
                                            <p className={"fw-bold me-5"}>Địa chỉ:</p>
                                            Hà Nội-Hai Bà Trưng-Bạch Mai
                                        </div>
                                        <div className={"d-flex"}>
                                            <p className={"fw-bold me-3"}>Email:</p>
                                            Nguyenduyhung@gmail.com
                                        </div>
                                        <div className={"d-flex"}>
                                            <p className={"fw-bold me-3"}>Phone:</p>
                                            09028817225
                                        </div>
                                    </div>
                                </div>
                                <div className={"d-flex mt-3"}>
                                    <span className={"me-2"}><i className="fa-solid fa-tag"></i></span>
                                    <p>GÍA KHÁM: </p>
                                    <p className={"fw-bold"}>300,000 đ</p>
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