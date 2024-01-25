import React from 'react';
import useShowFullContent from "./useShowFullContent";
import {Link} from "react-router-dom";

function Ophthalmology() {
    const [showFullContent, handleToggleContent] = useShowFullContent();

    return (
        <>
            <div className="container d-flex flex-column col-9 mt-2 mb-5 pb-4 ">
                <Link to='/home' className="d-flex">
                    <span className="me-2"><i className="fa-solid fa-house"></i></span>
                    <p className="ms-2">Khám chuyên khoa</p>
                </Link>
                <div>
                    <h5>Chuyên khoa Mắt</h5>
                    <p className="fw-bold mt-3">Bác sĩ Chuyên khoa Mắt</p>
                    <p>Hệ thống BookingCare cung cấp thông tin và lịch khám của các bác sĩ uy tín đầu ngành tại Việt
                        Nam.</p>
                    <ul className="mt-3">
                        <li>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về
                            chuyên khoa Mắt tại Hồ Chí Minh.
                        </li>
                        <li>Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như Bệnh viện Mắt Trung ương, Viện Y
                            học Hàng không - Không quân, Bệnh viện Mắt Quốc tế DND...
                        </li>
                        <li>Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao
                            cấp,...
                        </li>
                    </ul>
                    <p className="fw-bold mt-3">Các bệnh về mắt</p>
                    {showFullContent ? (
                        <>
                            <ul>
                                <li>Tật khúc xạ
                                </li>
                                <li>Cận thị
                                </li>
                                <li>Nhược thị
                                </li>
                                <li>Viễn thị
                                </li>
                                <li>Lão thị
                                </li>
                                <li>Loạn thị
                                </li>
                            </ul>
                            <p className="fw-bold mt-3">Các rối loạn về mắt</p>
                            <ul>
                                <li>Hội chứng khô mắt
                                </li>
                                <li>Rối loạn ở hốc mắt
                                </li>
                                <li>Rối loạn tuyến lệ
                                </li>
                                <li>Tăng nhãn áp
                                </li>
                            </ul>
                            <p className="fw-bold mt-3">Các bệnh lí khác về mắt</p>
                            <ul>
                                <li>Lác mắt
                                </li>
                                <li>Viêm giác mạc
                                </li>
                                <li>Đục thủy tinh thể
                                </li>
                                <li>Dịch kính võng mạc
                                </li>
                                <li>Bong võng mạc
                                </li>
                                <li>Bệnh thoái hóa hoàng điểm tuổi già
                                </li>
                            </ul>
                        </>
                    ) : null}

                    {showFullContent ? (
                        <button className="btn btn-link" style={{textDecoration: "none"}}
                                onClick={handleToggleContent}>Ẩn bớt</button>
                    ) : (
                        <button className="btn btn-link" style={{textDecoration: "none"}}
                                onClick={handleToggleContent}>Xem thêm</button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Ophthalmology;