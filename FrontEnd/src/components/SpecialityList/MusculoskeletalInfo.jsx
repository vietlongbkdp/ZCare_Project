import React from 'react';
import {Link} from "@mui/material";
import useShowFullContent from "./useShowFullContent";

function MusculoskeletalInfo() {
    const [showFullContent, handleToggleContent] = useShowFullContent();

    return (
        <>
        <div className="container d-flex flex-column col-8 mt-2 mb-5 pb-4 ">
            <Link className="d-flex">
                <span className="me-2"><i className="fa-solid fa-house"></i></span>
                <p className="ms-2">Khám chuyên khoa</p>
            </Link>
            <div>
                <h5>Cơ Xương Khớp</h5>
                <p className="fw-bold mt-3">Bác sĩ cơ xương khớp giỏi</p>
                <p>Danh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam:</p>
                <ul className="mt-3">
                    <li>Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm</li>
                    <li>Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa Hà Nội</li>
                    <li>Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp - Bệnh viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức,Bệnh Viện E.</li>
                    {showFullContent ? (
                        <>
                            <li>Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Cơ Xương Khớp, Hội Thấp khớp học,...</li>
                            <li>Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ Cao cấp,...</li>
                        </>
                    ) : null}
                </ul>
                    {showFullContent ? (
                        <>
                            <p className="fw-bold mt-2">Bệnh Cơ Xương Khớp</p>
                            <ul className="mt-3">
                                <li>Gout</li>
                                <li>Thoái hóa khớp: khớp gối, cột sống thắt lưng, cột sống cổ</li>
                                <li>Viêm khớp dạng thấp, Viêm đa khớp, Viêm gân</li>
                                <li>Tràn dịch khớp gối, Tràn dịch khớp háng, Tràn dịch khớp khủy, Tràn dịch khớp vai</li>
                                <li>Loãng xương, đau nhức xương</li>
                                <li>Viêm xương, gai xương</li>
                                <li>Viêm cơ, Teo cơ, chứng đau mỏi cơ</li>
                                <li>Yếu cơ, Loạn dưỡng cơ</li>
                                <li>Các chấn thương về cơ, xương, khớp</li>
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

export default MusculoskeletalInfo;