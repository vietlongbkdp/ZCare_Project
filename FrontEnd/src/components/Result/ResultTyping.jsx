import React, {useEffect, useState} from 'react';
import CkEditor from "../CkEditor/CkEditor";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {toast} from "react-toastify";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Autocomplete from '@mui/material/Autocomplete';
const schema = yup.object().shape({
    file: yup.mixed().required("File không được để trống"),
});
function ResultTyping() {
    const idCustomer = 1;
    const idDoctor = 1;
    const [customer, setCustomer] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [medicine, setMedicine] = useState(null);
    useEffect(async ()=>{
        await axios.get("http://localhost:8080/api/customer/getCustomer/" + idCustomer)
            .then(responseCustomer => {
                setCustomer(responseCustomer.data);
            })
            .catch(errorCustomer => {
                console.error('Lỗi lấy Customer:', errorCustomer);
            });
        await axios.get("http://localhost:8080/api/doctor/" + idDoctor)
            .then(responseDoctor => {
                setDoctor(responseDoctor.data);
            })
            .catch(errorDoctor => {
                console.error('Lỗi lấy Doctor:', errorDoctor);
            });
        await axios.get("http://localhost:8080/api/medicine")
            .then(responseMedicine => {
                setMedicine(responseMedicine.data);
            })
            .catch(errorMedicine => {
                console.error('Lỗi lấy Medicine:', errorMedicine);
            });
    }, [])
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({ resolver: yupResolver(schema),});
    const [editorContent, setEditorContent] = useState("");
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("file", data.file[0]);
        formData.append("editorContent", editorContent);
        try {
            await axios.post("http://localhost:8080/api/result", formData);
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
                <div className={"d-flex flex-column justify-content-center col-6 ms-3"}>
                    <div>
                        <h5>{doctor?.doctorName} </h5>
                    </div>
                    <div className={""}>
                        <p style={{fontSize: 20}}>Chức danh: {doctor?.position?.name}</p>
                        <p style={{fontSize: 20}}>Chuyên khoa: {doctor?.speciality?.specialtyName}</p>
                    </div>
                </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container d-flex">
                    <div className="d-flex flex-column col-8 border mt-3 me-4" style={{height: "600px"}}>
                        <h3 className="fw-bold text-center mt-2" >Phiếu trả kết quả khám chữa bệnh</h3>
                        <Box sx={{mt: 3}}>
                            <p style={{fontSize: 20, marginLeft: "20px"}}>Họ và tên bệnh nhân : {customer?.fullName}</p>
                            <p style={{fontSize: 20, marginLeft: "20px"}}>Giới tính: {customer?.gender.valueOf()}</p>
                            <p style={{fontSize: 20, marginLeft: "20px"}}>Số điện thoại: {customer?.phone}</p>
                            <p style={{fontSize: 20, marginLeft: "20px"}}>Địa chỉ: {customer?.address}</p>
                                <Grid item xs={12} sm={6} mb={2} marginLeft={"20px"} marginRight={"20px"}>
                                    <TextField
                                        autoComplete="diagResult"
                                        id="diagResult"
                                        fullWidth
                                        label="Kết quả chuẩn đoán"
                                        type="text"
                                        error={Boolean(errors.diagResult)}
                                        helperText={errors.diagResult?.message || ''}
                                        {...register('diagResult')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} mb={2} marginLeft={"20px"} marginRight={"20px"}>
                                    <TextField
                                        autoComplete="advice"
                                        fullWidth
                                        id="advice"
                                        type={"text"}
                                        label="Lời khuyên điều trị"
                                        error={Boolean(errors.advice)}
                                        helperText={errors.advice?.message || ''}
                                        {...register("advice")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} mb={2} marginLeft={"20px"} marginRight={"20px"}>
                                    <TextField
                                        autoComplete="doctorNotice"
                                        fullWidth
                                        id="doctorNotice"
                                        type={"text"}
                                        label="Ghi chú Bác sĩ"
                                        error={Boolean(errors.doctorNotice)}
                                        helperText={errors.doctorNotice?.message || ''}
                                        {...register("doctorNotice")}
                                    />
                                </Grid>
                            <Autocomplete
                                disablePortal
                                id="medicineSelect"
                                options={medicine}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Chọn thuốc" />}
                            />

                        </Box>
                    </div>
                    <div className="d-flex flex-column pd-6 mt-3 col-2">
                        <div className="border" style={{height: "120px"}}>
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

export default ResultTyping;