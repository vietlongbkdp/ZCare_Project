import React from 'react';
import useShowFullContent from "./useShowFullContent";
import {Link} from "react-router-dom";

function Pediatrics() {
    const [showFullContent, handleToggleContent] = useShowFullContent();


    return (
        <>
            <div className="container d-flex flex-column col-9 mt-2 mb-5 pb-4 ">
                <Link to='/home' className="d-flex">
                    <span className="me-2"><i className="fa-solid fa-house"></i></span>
                    <p className="ms-2">Khám chuyên khoa</p>
                </Link>
                <div>
                    <h5>Nhi khoa</h5>
                    <p className="fw-bold mt-3">Bác sĩ chuyên khoa Nhi </p>
                    <p>Danh sách bác sĩ chuyên khoa Nhi giỏi:</p>
                    <ul className="mt-3">
                        <li>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn tại Hồ Chí Minh</li>
                        <li>Các giảng viên đã và đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa Hồ Chí Minh</li>
                        <li>Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như: Bệnh viện Nhi Trung ương, Khoa Nhi - Bệnh viện Bạch Mai.
                        </li>
                    </ul>
                        {showFullContent ? (
                            <>
                                <p className="fw-bold mt-3">Khám và điều trị </p>
                                <ul className="mt-3">
                                    <li>Bệnh lý sơ sinh
                                    </li>
                                    <li>Bệnh tiêu hóa</li>
                                    <li>Bệnh tuần hoàn</li>
                                    <li>Bệnh hô hấp</li>
                                    <li>Bệnh huyết học</li>
                                    <li>Bệnh thận Tiết niệu</li>
                                    <li>Bệnh thần kinh</li>
                                    <li>Bệnh ngoài da</li>
                                    <li>Bệnh xương khớp</li>
                                </ul>
                            </>
                        ) : null}
                    {showFullContent ? (
                        <button className="btn btn-link" style={{textDecoration:"none"}} onClick={handleToggleContent}>Ẩn bớt</button>
                    ) : (
                        <button className="btn btn-link"  style={{textDecoration:"none"}} onClick={handleToggleContent}>Xem thêm</button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Pediatrics;