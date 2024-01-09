import React from 'react';
import {Link} from "@mui/material";
import useShowFullContent from "./useShowFullContent";

function NerveInfo() {
    const [showFullContent, handleToggleContent] = useShowFullContent();


    return (
        <>
        <div className="container d-flex flex-column col-8 mt-2 mb-5 pb-4 ">
            <Link className="d-flex">
                <span className="me-2"><i className="fa-solid fa-house"></i></span>
                <p className="ms-2">Khám chuyên khoa</p>
            </Link>
            <div>
                <h5>Thần kinh</h5>
                <p className="fw-bold mt-3">Bác sĩ Thần kinh giỏi</p>
                <p>Danh sách các giáo sư, bác sĩ chuyên khoa Thần kinh giỏi:</p>
                <ul className="mt-3">
                    <li>Các giáo sư, bác sĩ uy tín đầu ngành chuyên khoa Thần kinh đã và đang công tác tại các bệnh viện lớn như: Bệnh viện Bạch Mai, Bệnh viện Việt Đức, Bệnh viện 108, Bệnh viện Đại học Y Hà Nội, Bệnh viện 103.</li>
                    <li>Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hội Thần kinh Việt Nam, Hội Phẫu thuật Thần kinh...</li>
                    {showFullContent ? (
                        <>
                            <li>Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao
                                cấp.
                            </li>
                        </>
                    ) : null}
                </ul>
                {showFullContent ? (
                    <>
                        <p className="fw-bold mt-2">Khám bệnh chuyên khoa Thần kinh</p>
                        <ul className="mt-3">
                            <li>Bại Não</li>
                            <li>Đau đầu, chóng mặt, buồn nôn</li>
                            <li>Bệnh Pakison, bệnh tiền đình</li>
                            <li>Bị co cơ, căng dây thần kinh</li>
                            <li>Động kinh, có những cơn vãng ý thức</li>
                            <li>Bị tê bì nửa mặt, chèn dây thần kinh</li>
                            <li>Bồn chồn, lo lắng, hồi hộp, chân tay run</li>
                            <li>Có dấu hiệu tăng động</li>
                            <li>Co rút cổ, đau đầu với mặt, chân tay, vã mồ hôi</li>
                            <li>Chấn thương đầu, dây thần kinh</li>
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

export default NerveInfo;