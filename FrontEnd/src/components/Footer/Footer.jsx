import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import {fab} from "@fortawesome/free-brands-svg-icons";
import './Footer.css'
library.add(fab)
export default function Footer(){
    return(
        <div className={"container-fluid mt-2"} style={{padding: 0}}>
                <div className={"row d-flex justify-content-between px-5 p-3 botTop"}>
                    <div className={"col-5"}>
                        <h6>Công ty Cổ phần Công nghệ BookingCare</h6>
                        <p><FontAwesomeIcon icon="fas fa-map-marker-alt" className={"mx-2"}/> 28 Nguyễn Đình Chiểu ,
                            Phường Võ Thị Sáu, Quận 3, TP.Hồ Chí Minh </p>
                        <p><FontAwesomeIcon icon="fas fa-check-square" className={"mx-2"}/>ĐKKD số. 0106790291. Sở KHĐT
                            TP.Hồ Chí Minh cấp ngày 16/03/2015</p>
                        <p><FontAwesomeIcon icon="fas fa-phone-alt" className={"mx-2"}/>028 3331 916 (7h - 18h)</p>
                        <p><FontAwesomeIcon icon="fas fa-envelope" className={"mx-2"}/>
                            zcarebooking@gmail.com (7h - 18h)</p>
                        <img src="http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoCCDV.png" width={120}
                             alt="Chứng chỉ bộ công thương"/>
                    </div>
                    <div className={"col-2 footDetail"}>
                        <div className={"fs-4"} style={{marginBottom: 10, cursor: "pointer"}}><FontAwesomeIcon icon="fas fa-hospital-user" className={"mx-2"}/><span
                            className={"fw-bold"}>ZCARE</span></div>
                        <p>Chính sách bảo mật</p>
                        <p>Quy chế hoạt động</p>
                        <p>Liên hệ hợp tác</p>
                        <p>Điều khoản sử dụng</p>
                        <p>Câu hỏi thường gặp</p>

                    </div>
                    <div className={"col-5"}>
                    <h6>Đối tác bảo trợ nội dung</h6>
                        <div className={"d-flex my-2"} style={{cursor: "pointer"}}>
                            <img src="https://cdn.bookingcare.vn/fo/w64/2023/09/08/093706-hellodoctorlogo.png"
                                 height={40} width={60} className={"my-auto"}
                                 alt=""/>
                            <div className={"my-auto mx-2 "}>
                                <h6>Hello Doctor</h6>
                                <p>Bảo trợ chuyên mục nội dung "sức khỏe tinh thần"</p>
                            </div>
                        </div>
                        <div className={"d-flex my-2"}  style={{cursor: "pointer"}}>
                            <img src="https://cdn.bookingcare.vn/fo/w64/2022/03/21/082316-logo-bernard.png" height={40}
                                 width={60} className={"my-auto"}
                                 alt=""/>
                            <div className={"my-auto mx-2"}>
                                <h6>Hệ thống y khoa chuyên sâu quốc tế Bernard</h6>
                                <p>Bảo trợ chuyên mục nội dung "y khoa chuyên sâu"</p>
                            </div>
                        </div>
                        <div className={"d-flex my-2"}  style={{cursor: "pointer"}}>
                            <img src="https://cdn.bookingcare.vn/fo/w64/2023/11/29/110954-doctor-check.png" height={40}
                                 width={60} className={"my-auto"}
                                 alt=""/>
                            <div className={"my-auto mx-2"}>
                                <h6>Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn</h6>
                                <p>Bảo trợ chuyên mục nội dung "sức khỏe tổng quát"</p>
                            </div>
                    </div>


                </div>
            </div>
            <div className={"d-flex justify-content-between px-5 botFoot"} style={{height: 80}}>
                <div>@Product of ZenithTeam - 2024</div>
                <div className={"fs-2"}>
                    <FontAwesomeIcon icon="fab fa-facebook-square" className={"mx-3"} style={{cursor: "pointer"}}/>
                    <FontAwesomeIcon icon="fab fa-facebook-messenger" className={"mx-3"} style={{cursor: "pointer"}}/>
                    <FontAwesomeIcon icon="fab fa-viber" className={"mx-3"} style={{cursor: "pointer"}}/>
                </div>
            </div>
        </div>
    )
}