import React from 'react';
import useShowFullContent from "./useShowFullContent";
import {Link} from "react-router-dom";

function EarsNoseThroat() {
    const [showFullContent, handleToggleContent] = useShowFullContent();


    return (
        <>
        <div className="container d-flex flex-column col-9 mt-2 mb-5 pb-4 ">
            <Link to='/home' className="d-flex">
                <span className="me-2"><i className="fa-solid fa-house"></i></span>
                <p className="ms-2">Khám chuyên khoa</p>
            </Link>
            <div>
                <h5>Tai Mũi Họng</h5>
                <p className="fw-bold mt-3">Bác sĩ Chuyên khoa Tai Mũi Họng</p>
                <p className="fw-bold mt-3">Danh sách các bác sĩ uy tín đầu ngành tại Việt Nam:</p>
                <ul className="mt-3">
                    <li>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về chuyên ngành Tai Mũi Họng tại Hồ Chí Minh</li>
                    <li>Các giáo sư, phó giáo sư là giảng viên Đại học Y khoa Hồ Chí Minh</li>
                    <li>Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như Bệnh viện Bạch Mai, Bệnh Viện Tai Mũi Họng Trung ương, Bệnh viện Quân Y 108...</li>
                    {showFullContent ? (
                        <>
                            <li>Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ cao cấp,...
                            </li>
                        </>
                    ) : null}
                </ul>
                {showFullContent ? (
                    <>
                        <p className="fw-bold mt-2">Các bệnh Tai Mũi Họng</p>
                        <ul className="mt-3">
                            <li>Ù tai, đau tai, chảy máu tai</li>
                            <li>Thủng màng nhĩ, điếc đột ngột</li>
                            <li>Viêm tai giữa</li>
                            <li>Amidan, V.A</li>
                            <li>Viêm xoang</li>
                            <li>Nghẹt mũi</li>
                            <li>Hay bị chảy máu cam</li>
                            <li>Đau cổ họng, khó nuốt</li>
                            <li>Ho kéo dài</li>
                            <li>Ngủ ngáy  </li>
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

export default EarsNoseThroat;