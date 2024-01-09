import React from 'react';
import useShowFullContent from "./useShowFullContent";
import {Link} from "@mui/material";

function GastroenterologyInfo() {
    const [showFullContent, handleToggleContent] = useShowFullContent();


    return (
        <>
        <div className="container d-flex flex-column col-8 mt-2 mb-5 pb-4 ">
            <Link className="d-flex">
                <span className="me-2"><i className="fa-solid fa-house"></i></span>
                <p className="ms-2">Khám chuyên khoa</p>
            </Link>
            <div>
                <h5>Tiêu hoá</h5>
                <p className="fw-bold mt-3">Bác sĩ Chuyên khoa Tiêu hóa</p>
                <p>Danh sách các bác sĩ Tiêu hóa uy tín đầu ngành tại Việt Nam:</p>
                <ul className="mt-3">
                    <li>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về chuyên ngành Tiêu hóa tại Hà Nội</li>
                    <li>Các giáo sư, phó giáo sư là giảng viên Đại học Y khoa Hà Nội</li>
                    <li>Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như Bệnh viện Bạch Mai, Bệnh Viện Việt Đức, Bệnh Viện Nhi Trung ương, Bệnh viện Y học Cổ truyền Việt Nam...</li>
                    {showFullContent ? (
                        <>
                            <li>Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp,...
                            </li>
                        </>
                    ) : null}
                </ul>
                {showFullContent ? (
                    <>
                        <p className="fw-bold mt-2">Tư vấn, khám và điều trị các Bệnh Tiêu hóa</p>
                        <ul className="mt-3">
                            <li>Ăn uống kém, không ngon</li>
                            <li>Rối loạn tiêu hóa, táo bón, trĩ</li>
                            <li>Nhiễm vi khuẩn HP (Helicobacter pylori)</li>
                            <li>Nội soi dạ dày, đại tràng, tiêu hóa</li>
                            <li>Buồn nôn, chướng bụng, đầy bụng ợ chua, đầy hơi</li>
                            <li>Co thắt thực quản, Hội chứng ruột kích thích</li>
                            <li>Đau bụng, dạ dày, đại tràng, thượng vị</li>
                            <li>Viêm đại tràng, dạ dày, tá tràng</li>
                            <li>Ung thư dạ dày, U nang tuyến tụy</li>
                            <li>Bệnh lý về gan, mật</li>
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

export default GastroenterologyInfo;