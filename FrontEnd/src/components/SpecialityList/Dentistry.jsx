import React from 'react';
import useShowFullContent from "./useShowFullContent";
import {Link} from "react-router-dom";

function Dentistry() {
    const [showFullContent, handleToggleContent] = useShowFullContent();


    return (
        <>
            <div className="container d-flex flex-column col-9 mt-2 mb-5 pb-4 ">
                <Link to='/home' className="d-flex">
                    <span className="me-2"><i className="fa-solid fa-house"></i></span>
                    <p className="ms-2">Khám chuyên khoa</p>
                </Link>
                <div>
                    <h5>Nha khoa</h5>
                    <p className="fw-bold mt-3">Bác sĩ Nha khoa </p>
                    <p>Danh sách bác sĩ Nha khoa uy tín tại Việt Nam:</p>
                    <ul className="mt-3">
                        <li>Các chuyên gia có quá trình đào tạo bài bản, nhiều năm kinh nghiệm và khám, điều trị các
                            bệnh lý nha khoa và răng thẩm mỹ tại Hà Nội.
                        </li>
                        <li>Các bác sĩ đã hoặc đang công tác tại các bệnh viện, phòng khám nha khoa uy tín, với các
                            trang thiết bị hiện đại.
                        </li>
                    </ul>
                    <p className="fw-bold mt-3">Khám tư vấn, điều trị các bệnh lý về răng, làm răng thẩm mỹ </p>
                    {showFullContent ? (
                        <>
                            <ul className="mt-3">
                                <li>Nhổ răng</li>
                                <li>Hàn răng</li>
                                <li>Điều trị tủy</li>
                                <li>Điều trị Viêm nha chu</li>
                                <li>Bọc răng sứ</li>
                                <li>Làm răng giả</li>
                                <li>Dán sứ Veneer</li>
                                <li>Niềng răng (nắn chỉnh răng)</li>
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

export default Dentistry;