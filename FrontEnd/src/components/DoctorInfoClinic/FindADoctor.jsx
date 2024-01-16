import React from "react";
import SearchBar from "../HomeContent/SearchBar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import DoctorInfoClinic from "./DoctorInfoClinic";

export default function FindADoctor() {
  return (
      <>
        <Header/>
        <div className="w-100">
          <div className="d-flex flex-column" style={{backgroundColor: "rgb(237 255 250)"}}>
            <h2 className="d-flex justify-content-center mt-3">TÌM KIẾM BÁC SỸ</h2>
            <p className="d-flex justify-content-center mt-4">
              Tìm kiếm nhanh thông tin bác sỹ theo tên phòng khám và chuyên khoa
            </p>
            <SearchBar/>
          </div>
        </div>
        <div className={"mt-3"}>
          <DoctorInfoClinic/>
          <DoctorInfoClinic/>
        </div>
        <Footer/>
      </>
  );
}
