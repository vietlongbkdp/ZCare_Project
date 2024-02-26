import React, {useContext, useState} from 'react';
import CkEditor from "../CkEditor/CkEditor";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {toast} from "react-toastify";
import * as yup from "yup";
import {ApiContext} from "../ApiContext/ApiProvider";
const schema = yup.object().shape({
    file: yup.mixed().required("File không được để trống"),
});
function Result() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({ resolver: yupResolver(schema),});
    const [editorContent, setEditorContent] = useState("");
    const { API } = useContext(ApiContext)
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("file", data.file[0]);
        formData.append("editorContent", editorContent);
        try {
            await axios.post(`${API}/api/result`, formData);
            toast.success("Gửi API thành công");
            reset();
            setEditorContent("");
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data;
                toast.error(errorMessage);
            } else {
                toast.error("Gửi API thất bại");
                console.error(error);
            }
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container d-flex">
                    <div className="d-flex flex-column col-8 border mt-3 me-4" style={{ height: "600px" }}>
                        <p className="fw-bold">Kết quả khám (*)</p>
                        <input
                            type="file"
                            className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-lg"
                            {...register("file")}
                        />
                        <p className="fw-bold mt-3">Ghi chú kết quả khám</p>
                        <CkEditor setEditorContent={setEditorContent} />
                    </div>
                    <div className="d-flex flex-column pd-6 mt-3 col-2">
                        <div className="border" style={{ height: "120px" }}>
                            <div className="mt-2 d-flex justify-content-center">
                                <p className="fw-bold border-bottom py-2">Xuất bản</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary">
                                    <i className="fa-solid fa-floppy-disk"></i>
                                    Lưu dữ liệu
                                </button>
                                <button className="btn btn-danger">
                                    <i className="fa-solid fa-rotate-left"></i>
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Result;