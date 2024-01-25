import React from 'react';
import {Link} from "react-router-dom";
import useShowFullContent from "./useShowFullContent";

function Pediatric() {
    const [showFullContent, handleToggleContent] = useShowFullContent();


    return (<>
            <div className="container d-flex flex-column col-9 mt-2 mb-5 pb-4 ">
                <Link to='/home' className="d-flex">
                    <span className="me-2"><i className="fa-solid fa-house"></i></span>
                    <p className="ms-2">Khám chuyên khoa</p>
                </Link>
                <div>
                    <h5>Nội khoa</h5>
                    <p className="fw-bold mt-3">Bác sĩ Thần kinh giỏi</p>
                    <p>ZCare cung cấp thông tin và lịch khám của các bác sĩ chuyên khoa Nội giỏi tại Hồ Chí Minh.</p>
                    <p>Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn tại Hà
                        Nội
                        như: Bệnh viện Bạch Mai, Bệnh Viện Quân Y 103...</p>
                    <p className="fw-bold">Khám và điều trị</p>
                    {showFullContent ? (<>
                            <p>Bệnh nhân nên đặt khám với các bác sĩ nếu gặp các triệu chứng bên dưới đây:</p>
                            <ul className="mt-3">
                                <li>Kiểm tra sức khỏe
                                </li>
                                <li>Chóng mặt
                                </li>
                                <li>Mêt mỏi
                                </li>
                                <li>Hoa mắt
                                </li>
                                <li>Kém ăn
                                </li>
                                <li>Giảm sút cân
                                </li>
                                <li>Khó ngủ
                                </li>
                                <li>
                                    Đau đầu
                                </li>
                                <li>Ngộ độc rượu
                                </li>
                                <li>Ngộ độc thức ăn
                                </li>
                                <li>Dị ứng
                                </li>
                                <li>Viêm da dị ứng
                                </li>
                                <li>Dị ứng thực phẩm
                                </li>
                                <li>Dị ứng côn trùng
                                </li>
                                <li>Dị ứng vật nuôi
                                </li>
                                <li>Nổi mề đay
                                </li>
                                <li>Rối loạn miễn dịch
                                </li>
                                <li>Rối loạn chuyển hóa
                                </li>
                            </ul>
                            <p>Ngoài những vấn đề nêu trên, bệnh nhân có thể liên hệ với chúng tôi để được hỗ trợ, sắp
                                xếp lịch khám phù hợp.</p>
                        </>) : null}
                    {showFullContent ? (<button className="btn btn-link" style={{textDecoration: "none"}}
                                                onClick={handleToggleContent}>Ẩn
                            bớt</button>) : (<button className="btn btn-link" style={{textDecoration: "none"}}
                                                     onClick={handleToggleContent}>Xem
                            thêm</button>)}
                </div>
            </div>
        </>);
}

export default Pediatric;