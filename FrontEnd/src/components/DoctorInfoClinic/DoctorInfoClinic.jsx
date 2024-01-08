import React from 'react';
import "./DoctorInfoClinic.css"
import {Link} from "@mui/material";
function DoctorInfoClinic() {
    return (
        <>
          <div className={"container d-flex mt-2 rounded border shadow-sm p-4"}>
              <div className={"d-flex mt-2"}>
                  <div className={"d-flex flex-column justify-content-around col-6 border-end"} >
                      <div className={"d-flex justify-content-start mb-auto"}>
                          <div className={"col-sm-2"}>
                              <div className="avatar">
                                  <div className="w-24 rounded">
                                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt={""} style={{width:"70px"}}/>
                                  </div>
                              </div>
                              <Link to="/" >Xem thêm</Link>

                          </div>
                          <div className={"d-flex flex-column justify-content-center ms-3"}>
                              <div>
                              <h5 style={{color:"#74b9ff"}}>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thị Hoài An </h5>
                              </div>
                              <div>
                                  <h6>Nguyên Trưởng khoa Tai mũi họng trẻ em, Bệnh viện Tai Mũi Họng Trung ương
                                      Trên 25 năm công tác tại Bệnh viện Tai mũi họng Trung ương
                                      Chuyên khám và điều trị các bệnh lý Tai Mũi Họng người lớn và trẻ em</h6>
                              </div>
                              <div className={"d-flex"}>
                                  <span className={"me-2"}><i className="fa-solid fa-location-dot"></i></span>
                                  <h6>Hà Nội</h6>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className={"d-flex flex-column ms-4 col-6"}>
                      <div>
                          <select className="select select-ghost w-full max-w-xs">
                              <option selected>Pick the best JS framework</option>
                              <option>Svelte</option>
                              <option>Vue</option>
                              <option>React</option>
                          </select>
                      </div>
                      <div className={"d-flex mt-3"}>
                          <span className={"me-2"}><i className="fa-regular fa-calendar-days"></i></span>
                          <h5>Lịch khám</h5>
                      </div>
                      <div className={"d-flex flex-wrap gap-3"}>
                          <Link to="/" className="schedule ">10:30 - 12:00</Link>
                          <Link to="/" className="schedule ">13:20 - 14:00</Link>
                          <Link to="/" className="schedule ">14:10 - 14:40</Link>
                          <Link to="/" className="schedule ">15:00 - 15:30</Link>
                          <Link to="/" className="schedule ">15:45 - 16:00</Link>
                          <Link to="/" className="schedule ">16:10 - 16:35</Link>
                          <Link to="/" className=" schedule ">17:00 - 17:30</Link>
                      </div>
                      <div className={"d-flex mt-2"}>
                          <div>Chọn</div>
                          <div>
                              <span><i className="fa-regular fa-hand-pointer"></i></span>
                          </div>
                          <div> và đặt (Phí đặt lịch 0đ)</div>
                      </div>
                      <div className={"d-flex flex-column border-top border-bottom mt-3 py-2"}>
                          <div>ĐỊA CHỈ KHÁM</div>
                          <div className={"fw-bold"}>Bệnh viện Đa khoa An Việt</div>
                          <div>Số 1E Trường Chinh - Thanh Xuân - Hà Nội</div>
                      </div>
                      <div className={"d-flex mt-3 border-bottom py-3"}>
                          <div className={"me-2"}>Giá Khám: 400.000đ</div>
                         <Link to="/" >Xem chi tiết</Link>
                      </div>
                      <div className={"d-flex mt-3"}>
                          <div className={"me-2"}>Loại bảo hiểm áp dụng: </div>
                          <Link to="/" >Xem chi tiết</Link>
                      </div>
                  </div>

              </div>


          </div>
        </>
    );
}

export default DoctorInfoClinic;