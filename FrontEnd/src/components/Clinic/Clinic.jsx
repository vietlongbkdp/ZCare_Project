import React from 'react';

function Clinic() {
    return (
        <>
            <div className={"container d-flex rounded border shadow-sm p-3 mt-3 mb-3 col-4 px-4 py-4"}>
                <div className={"d-flex flex-column"}>
                    <h4 style={{color: "#74b9ff"}}>BrainCare</h4>
                    <p className={"fw-bold"} style={{color: "#81ecec"}}>Tầng 7,Tòa 59 Võ Chí Công, Nghĩa Đô, Cầu giấy,
                        Hà Nội</p>
                    <p>Viện tâm lý Giáo dục BrainCare với đội ngũ gồm các chuyên gia</p>
                    <div className={"d-flex"}>
                        <span className={"me-4"}><i className="fab fa-facebook"></i></span>
                        <span className={"me-4"}><i className="fab fa-instagram"></i></span>
                        <span className={"me-4"}><i className="fab fa-twitter"></i></span>
                        <span className={"me-4"}><i className="fab fa-linkedin"></i></span>
                    </div>
                </div>
                <div className={"d-flex flex-column justify-content-center ms-3"}>
                    <div className="w-24 rounded">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt={""}
                             style={{width: "120px"}}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Clinic;