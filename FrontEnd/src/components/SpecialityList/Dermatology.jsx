import React from 'react';
import {Link} from "react-router-dom";
import useShowFullContent from "./useShowFullContent";

function Dermatology() {
    const [showFullContent, handleToggleContent] = useShowFullContent();

    return (
        <>
        <div className="container d-flex flex-column col-9 mt-2 mb-5 pb-4 ">
            <Link to='/home' className="d-flex">
                <span className="me-2"><i className="fa-solid fa-house"></i></span>
                <p className="ms-2">Khám chuyên khoa</p>
            </Link>
            <div>
                <h5>Da liễu</h5>
                <p className="fw-bold mt-3">Bác sĩ Chuyên khoa Da liễu</p>
                <p>ZCare cung cấp thông tin và lịch khám của các bác sĩ chuyên khoa da liễu giỏi tại Hồ Chí Minh.</p>
                <p>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn tại Hà Nội
                    như: Bệnh viện Da liễu Trung ương, Bệnh viện Da liễu Hồ Chí Minh.</p>
                <p className="fw-bold ">Khám và điều trị</p>
                {showFullContent ? (
                    <ul className="mt-3">
                        <li>Bệnh vẩy nến, Da khô, Ngứa da</li>
                        <li>Nám tàn nhang</li>
                        <li>Mụn cóc sinh dục
                        </li>
                        <li>Nấm cơ thể, Nấm da đầu
                        </li>
                        <li>Nấm móng tay, móng chân
                        </li>
                        <li>Rụng tóc, hói đầu
                        </li>
                        <li>Viêm da dị ứng, Viêm da tiếp xúc, Viêm da tiết bã
                        </li>
                        <li>Viêm nang lông
                        </li>
                        <li>Xơ cứng bì
                        </li>
                        <li>Zona thần kinh
                        </li>
                    </ul>
                ) : null}
                {showFullContent ? (
                    <button className="btn btn-link" style={{textDecoration: "none"}} onClick={handleToggleContent}>Ẩn
                        bớt</button>
                ) : (
                    <button className="btn btn-link" style={{textDecoration: "none"}} onClick={handleToggleContent}>Xem
                        thêm</button>
                )}
            </div>
        </div>
        </>
    );
}

export default Dermatology;