// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
export default function Header(){
    return(
        <div className={"container-fluid"}>
            <div className={"d-flex justify-content-between fw-bold"}>
                <div className={"d-flex justify-content-between"}>
                    <div className={"mx-4"}>
                        <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                        28 Nguyễn Tri Phương
                    </div>
                    <div className={"mx-4"}>
                        (0913 331 916)
                    </div>
                </div>
                <div className={"d-flex justify-content-between"}>
                    <div className={"mx-4"}>
                        T.2 - CN: 6h30 AM - 20h30 PM
                    </div>
                    <div className={"mx-4"}>
                        Đăng ký/ Đăng nhập
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
} 