import React from 'react';
import useShowFullContent from "./useShowFullContent";
import {Link} from "react-router-dom";


function CardiologyInfor() {
    const [showFullContent, handleToggleContent] = useShowFullContent();


    return (
        <>
            <div className="container d-flex flex-column col-9 mt-2 mb-5 pb-4 ">
                <Link to='/home' className="d-flex">
                    <span className="me-2"><i className="fa-solid fa-house"></i></span>
                    <p className="ms-2">Khám chuyên khoa</p>
                </Link>
                <div>
                    <h5>Tim mạch</h5>
                    <p className="fw-bold mt-3">Bác sĩ tim mạch giỏi</p>
                    <p>Danh dách các bác sĩ tim mạch uy tín đầu ngành tại Việt Nam:</p>
                    <ul className="mt-3">
                        <li>Các chuyên gia được đào tạo bài bản về chuyên ngành Tim mạch tại các trường đại học trong nước và quốc tế.</li>
                        <li>Các giáo sư, phó giáo sư nghiên cứu và giảng dạy tại Đại học Y Hà Nội</li>
                        <li>Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như Viện Tim Mạch Quốc Gia, Bệnh viện Bạch Mai, Bệnh viện Việt Đức, Bệnh Viện E, Bệnh Viện Tim Hà Nội
                        </li>
                        {showFullContent ? (
                            <>
                                <li>Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Tim Mạch Việt Nam</li>
                                <li>Đạt danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ Cao cấp,...</li>
                            </>
                        ) : null}
                    </ul>
                    {showFullContent ? (
                        <>
                            <p className="fw-bold mt-2">Khám tư vấn tim mạch</p>
                            <ul className="mt-3">
                                <li>Khó thở, Đau ngực, đau tim</li>
                                <li>Tăng huyết áp, hạ huyết áp</li>
                                <li>Rối loạn mỡ máu, cao huyết áp, chóng mặt</li>
                                <li>Bệnh van tim (Hẹp hở van tim), Hẹp động mạch chủ</li>
                                <li>Cảm giác hồi hộp, tim đập nhanh</li>
                                <li>Tim bẩm sinh, có tiền sử bệnh tim to, tiền sử tai biến</li>
                                <li>Đã đặt stent tim, nong động mạch vành</li>
                                <li>Giãn tĩnh mạch chân</li>
                                <li>...</li>
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

export default CardiologyInfor;