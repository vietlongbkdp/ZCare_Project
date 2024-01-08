import React from 'react';
import {Link} from "@mui/material";
import "./Doctorinfo.css"

function DoctorInfo() {
    return (
        <>
            <div className={"container-fluid border-bottom"}>
                <div className={"container pb-4 "}>
                    <div className={"d-flex "}>
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                     alt={""}
                                     className="rounded-circle" style={{width: "100px"}}/>
                            </div>
                        </div>
                        <div className={"d-flex flex-column justify-content-center col-7 ms-3"}>
                            <div>
                                <h3>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thị Hoài An </h3>
                            </div>
                            <div className={""}>
                                <h6>Nguyên Trưởng khoa Tai mũi họng trẻ em, Bệnh viện Tai Mũi Họng Trung ương
                                    Trên 25 năm công tác tại Bệnh viện Tai mũi họng Trung ương
                                    Chuyên khám và điều trị các bệnh lý Tai Mũi Họng người lớn và trẻ em</h6>
                            </div>
                            <div className={"d-flex"}>
                                <span className={"me-2"}><i className="fa-solid fa-location-dot"></i></span>
                                <h6>Hà Nội</h6>
                            </div>
                        </div>
                    </div>
                    <div className={"d-flex mt-5"}>
                        <div className={"d-flex flex-column col-6 border-end"}>
                            <div>
                                <select className="select select-ghost w-full max-w-xs">
                                    <option selected>Pick the best JS framework</option>
                                    <option>Svelte</option>
                                    <option>Vue</option>
                                    <option>React</option>
                                </select>
                            </div>
                            <div className={"d-flex mt-3"}>
                                <span className={"me-2"}><i className="fa-regular fa-calendar-days"></i></span>
                                <h5>Lịch khám</h5>
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
                            <div className={"d-flex mt-2"}>
                                <div>Chọn</div>
                                <div>
                                    <span><i className="fa-regular fa-hand-pointer"></i></span>
                                </div>
                                <div> và đặt (Phí đặt lịch 0đ)</div>
                            </div>
                        </div>
                        <div className={"d-flex flex-column col-6 ms-3"}>
                            <div className={"d-flex flex-column border-bottom mt-3 py-2"}>
                                <div>ĐỊA CHỈ KHÁM</div>
                                <div className={"fw-bold"}>Bệnh viện Đa khoa An Việt</div>
                                <div>Số 1E Trường Chinh - Thanh Xuân - Hà Nội</div>
                            </div>
                            <div className={"d-flex mt-3 border-bottom py-3"}>
                                <div className={"me-2"}>Giá Khám: 400.000đ</div>
                                <Link to="/">Xem chi tiết</Link>
                            </div>
                            <div className={"d-flex mt-3"}>
                                <div className={"me-2"}>Loại bảo hiểm áp dụng:</div>
                                <Link to="/">Xem chi tiết</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"container-fluid border-bottom"} style={{backgroundColor:"rgb(248 250 250)"}}>
                <div className={"container pb-4"} >
                    <div className={"d-flex flex-column"}>
                        <h6 className={"mt-4"}>Phó Giáo sư, Tiến sĩ, Bác sĩ Cao cấp Nguyễn Duy Hưng</h6>
                        <ul>
                            <li>Phó giáo sư, Tiến sĩ, Bác sĩ cao cấp chuyên khoa Da liễu</li>
                            <li>Bác sĩ từng công tác tại Bệnh viện Da liễu Trung ương</li>
                            <li>Nguyên Trưởng phòng chỉ đạo tuyến tại Bệnh viện Da liễu Trung ương</li>
                            <li>Đạt chứng chỉ Diploma về Da liễu tại Viện da liễu Băng Cốc - Thái Lan</li>
                        </ul>
                        <h6>Phó Giáo sư khám và điều trị</h6>
                        <p>Các bệnh lý về chuyên sâu về da liễu người lớn và trẻ em</p>
                        <ul>
                            <li>Trứng cá thông thường thanh thiếu niên, người lớn, trứng cá do thuốc, mỹ phẩm, do bôi
                                corticord, các thể bệnh trứng cá nặng, trứng cá đỏ (rosacea)
                            </li>
                            <li>Điều trị da phục hồi da tổn hại do trứng cá, sẹo trứng cá</li>
                            <li>Các bệnh lý da mặt: viêm da dị ứng, tổn hại da do sử dụng mỹ phẩm, do corticord, lão hóa
                                da
                            </li>
                            <li>Nám da, tàn nhang, sạm da, các bệnh da tăng sắc tố sau viêm, sau trứng cá, do mỹ phẩm
                            </li>
                            <li>Viêm da cơ địa trẻ em và người lớn</li>
                        </ul>
                        <p className={"fw-bold"}>Và các bệnh lý chuyên sâu khác về chuyên khoa Da liễu</p>
                    </div>
                </div>
            </div>
            <div className={"container"}>
                <div className={"d-flex flex-column"}>
                    <div>
                        <h5 className={"mt-4"}>Phản hồi của bệnh nhân sau khi đi khám</h5>
                    </div>
                    <div className={"d-flex mt-3 border-top py-3"}>
                        <div className={"me-1"}>Nguyễn Đức Mạnh</div>
                       <span><i className="fa-regular fa-circle-check"></i></span>
                        <span className={"ms-2"}>đã khám ngày 29/11/2023</span>
                    </div>
                    <div className={"border-bottom py-3"}>Dịch vụ tốt</div>
                </div>
            </div>

        </>
    );
}

export default DoctorInfo;