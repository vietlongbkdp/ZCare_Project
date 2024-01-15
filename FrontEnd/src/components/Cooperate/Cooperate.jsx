import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
const schema = yup.object({
    fullName: yup.string().required("tên không được để trống")
})

function Cooperate() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            await axios.post('http://localhost:8080/api/cooperate', data);
            toast.success("Gửi thông tin thành công")
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className={"container d-flex flex-column justify-content-center mt-5 mb-5 pb-5 col-6"}>
                <h4>Hợp Tác Cùng ZCare</h4>
                <p className={"border-top mt-2 py-3"}>ZCare rất hân hạnh được hợp tác với bác sĩ và cơ sở y tế.
                    Vui lòng gửi thông tin, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={"mt-2"}>
                        <label className={"fw-bold"}>Người liên hệ</label>
                        <input type="text"
                            className={`form-control w-50 ${errors?.fullName?.message ? "is-invalid" : ""}`}
                            {...register('fullName')}
                            placeholder={"(Bắt buộc)"} />
                        <span className="text-danger">{errors?.fullName?.message}</span>
                    </div>
                    <div>
                        <label className={"fw-bold"}>Số điện thoại</label>
                        <input type="tel" className={"form-control w-50"} {...register("phone")}
                            placeholder={"(Bắt buộc)"} />
                    </div>
                    <div>
                        <label className={"fw-bold"}>Địa chỉ email</label>
                        <input type="email" className={"form-control w-50"} {...register("email")}
                            placeholder={"(Bắt buộc)"} />
                    </div>
                    <div>
                        <label className={"fw-bold"}>Tên cơ sở y tế</label>
                        <input type="text" className={"form-control"}
                            {...register("clinicName")} placeholder={"Bệnh viện, Phòng khám, Tổ chức, Công ty"} />
                    </div>
                    <div>
                        <label className={"fw-bold"}>Địa chỉ</label>
                        <input type="text" {...register("address")} className={"form-control"} />
                    </div>
                    <div>
                        <label className={"fw-bold"}>Nội dung</label>
                        <textarea name="" id="" cols="10" rows="4" {...register("content")}
                            className={"form-control"}></textarea>
                    </div>
                    <div className={"mt-3"}>
                        <button type="submit" className="btn btn-warning">Gửi thông tin</button>
                    </div>

                </form>
            </div>
        </>
    );
}

export default Cooperate;