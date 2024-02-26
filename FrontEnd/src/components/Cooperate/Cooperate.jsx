
import React, {useContext, useState} from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import Loading from "../Loading/Loading";
import {ApiContext} from "../ApiContext/ApiProvider";

const schema = yup.object({
  fullName: yup.string().required("Tên không được để trống"),
  phone: yup.string().required("Số điện thoại không được để trống"),
  email: yup
    .string()
    .email("Email phải đúng định dạng")
    .required("Email không được để trống"),
  address: yup.string().required("Địa chỉ không được để trống"),
  clinicName: yup.string().required("Không được để trống"),
  content: yup.string().required("Nội dung không được để trống"),
});

function Cooperate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [capVal, setCapVal] = useState(null);
  const { API } = useContext(ApiContext)
  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await axios.post(`${API}/api/cooperate`, data);
      toast.success("Gửi thông tin thành công");
      reset();
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="d-flex flex-column justify-content-center align-items-center"
        style={{ backgroundColor: "rgb(237 255 250)", height: "200px" }}>
        <h2>Đăng kí hợp tác</h2>
        <p>Tham gia ngay cùng Zcare để cùng chúng tôi cùng xây dựng hành trình sức khỏe hoàn hảo nào! </p>
      </div>
      <div className={"container d-flex flex-column justify-content-center mt-5 mb-5 pb-5 col-6"} >
        <h4>Hợp Tác Cùng ZCare</h4>
        <p className={"border-top mt-2 py-3"}>
          ZCare rất hân hạnh được hợp tác với bác sĩ và cơ sở y tế. Vui lòng gửi
          thông tin, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={"mt-2"}>
            <label className={"fw-bold"}>Người liên hệ</label>
            <input
              type="text"
              className={`form-control w-50 ${errors?.fullName?.message ? "is-invalid" : ""
                }`}
              {...register("fullName")}
            />
            <span className="text-danger">{errors?.fullName?.message}</span>
          </div>
          <div>
            <label className={"fw-bold"}>Số điện thoại</label>
            <input
              type="tel"
              className={`form-control w-50 ${errors?.phone?.message ? "is-invalid" : ""
                }`}
              {...register("phone")}
            />
            <span className="text-danger">{errors?.phone?.message}</span>
          </div>
          <div>
            <label className={"fw-bold"}>Địa chỉ email</label>
            <input
              type="email"
              className={`form-control w-50 ${errors?.email?.message ? "is-invalid" : ""
                }`}
              {...register("email")}
            />
            <span className="text-danger">{errors?.email?.message}</span>
          </div>
          <div>
            <label className={"fw-bold"}>Tên cơ sở y tế</label>
            <input
              type="text"
              className={`form-control ${errors?.clinicName?.message ? "is-invalid" : ""
                }`}
              {...register("clinicName")}
              placeholder={"Bệnh viện, Phòng khám, Tổ chức, Công ty"}
            />
            <span className="text-danger">{errors?.clinicName?.message}</span>
          </div>
          <div>
            <label className={"fw-bold"}>Địa chỉ</label>
            <input
              type="text"
              {...register("address")}
              className={`form-control ${errors?.address?.message ? "is-invalid" : ""
                }`}
            />
            <span className="text-danger">{errors?.address?.message}</span>
          </div>
          <div style={{ marginBottom: '10px'}}>
            <label className={"fw-bold"}>Nội dung</label>
            <textarea
              name=""
              id=""
              cols="10"
              rows="4"
              {...register("content")}
              className={`form-control ${errors?.content?.message ? "is-invalid" : ""
                }`}
            ></textarea>
            <span className="text-danger">{errors?.content?.message}</span>
          </div>
          <ReCAPTCHA
            sitekey="6LcYkHcpAAAAAFl-WpEChl-QnT9j0obWIoQF31ox"
            onChange={val => setCapVal(val)}
          />
          <div className={"mt-3"}>
            <button disabled={!capVal} className="btn btn-warning">
              Gửi thông tin
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Cooperate;
