import React, {useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import { jsPDF } from 'jspdf';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {toast} from "react-toastify";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Autocomplete from '@mui/material/Autocomplete';
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
const schema = yup.object().shape({
    diagResult: yup.string().required("Kết quả không được để trống"),
    advice: yup.string().required("Bác sĩ cần đưa ra lời khuyên cho bệnh nhân")
});
function ResultTyping() {
    const idCustomer = 1;
    const idDoctor = 1;
    const [customer, setCustomer] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [medicine, setMedicine] = useState(null);
    const [listMedicine, setListMedicine] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCustomer = await axios.get("http://localhost:8080/api/customer/getCustomer/" + idCustomer);
                setCustomer(responseCustomer.data);
            } catch (errorCustomer) {
                console.error('Lỗi lấy Customer:', errorCustomer);
            }

            try {
                const responseDoctor = await axios.get("http://localhost:8080/api/doctor/" + idDoctor);
                setDoctor(responseDoctor.data);
            } catch (errorDoctor) {
                console.error('Lỗi lấy Doctor:', errorDoctor);
            }

            try {
                const responseMedicine = await axios.get("http://localhost:8080/api/medicine");
                setMedicine(responseMedicine.data);
            } catch (errorMedicine) {
                console.error('Lỗi lấy Medicine:', errorMedicine);
            }
        };

        fetchData();
    }, []);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({ resolver: yupResolver(schema),});
    const unitMedicine = ["Viên", "Vỉ", "Hộp", "Lọ", "Gói"]
    const onSubmit = async (data) => {
        const dataNew = {
            ...data,
            medicineList: listMedicine
        }
        console.log(dataNew)
        const resp = await axios.post("http://localhost:8080/api/result", dataNew)
        if (resp.status == '200') {
            await createPDF(dataNew);
            toast.success("Đã tạo được đơn thuốc");
            reset();
            setListMedicine([]);
        } else {
            toast.error("Có lỗi, chưa lưu được")
        }
    };
    const checkExistMedicine = (listMed, medicineName) =>{
        let flag = false;
        listMed.forEach((item)=>{
            if(item.medicineName === medicineName){
                flag = true
            }
        })
        return flag
    }
    const handleSaveMedicineDetail = ()=>{
        const medicineName = document.getElementById("medicineSelect").value;
        const quantity = parseInt(document.getElementById("quantity").value);
        const unit = document.getElementById("unit").value;
        const useNote = document.getElementById("useNote").value;
        if(medicineName === ""|| isNaN(quantity) || unit === ""|| useNote === ""){
            toast.error("Cần nhập đầy đủ thông tin thuốc")
        }else{
            if(checkExistMedicine(listMedicine, medicineName) === false){
                setListMedicine([
                    ...listMedicine,
                    {
                        medicineName: medicineName,
                        quantity: quantity,
                        unit: unit,
                        useNote: useNote
                    }
                ])
                document.getElementById("quantity").value = "";
                document.getElementById("useNote").value = "";
            }else{
                toast.error("Thuốc này đã tồn tại")
            }
        }
    }
    const handleDeleteMedicine = (index) =>{
        Swal.fire({
            title: "Xác nhận xoá thuốc này",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý!",
            cancelButtonText: "Huỷ"
        }).then(async (result) => {
            if (result.isConfirmed) {
                listMedicine.splice(index, 1);
                setListMedicine([
                    ...listMedicine
                ])
                toast.success("Đã xoá khỏi đơn thuốc!");
            }
        });
    }

    async function createPDF(data) {
        const doc = new jsPDF();
        doc.setFont("aria");
        doc.setFontSize(12);
        doc.text("Chuan doan: " + data.diagResult, 10, 10);
        doc.text("Loi khuyen bac si: " + data.advice, 10, 20);
        doc.save(idCustomer + ".pdf");
        console.log(doc)
    }
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
                <div className="container" align={"center"}>
                    <div className="d-flex flex-column border mt-3 me-4 p-3" style={{height: "auto"}}>
                        <h3 className="fw-bold text-center mt-2">Phiếu trả kết quả khám chữa bệnh</h3>
                        <Box sx={{mt: 3}}>
                            <p style={{fontSize: 20, marginLeft: "20px"}}>Họ và tên bệnh nhân : {customer?.fullName}</p>
                            <p style={{fontSize: 20, marginLeft: "20px"}}>Giới tính: {customer?.gender.valueOf()}</p>
                            <p style={{fontSize: 20, marginLeft: "20px"}}>Số điện thoại: {customer?.phone}</p>
                            <p style={{fontSize: 20, marginLeft: "20px"}}>Địa chỉ: {customer?.address}</p>
                            <Grid item xs={12} sm={6} mb={2} mx={10}>
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
                            <Grid item xs={12} sm={6} mb={2} mx={10}>
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
                            <Grid item xs={12} sm={6} mb={2} mx={10}>
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
                            <Grid item xs={12} sm={6} mb={2} marginLeft={"20px"} marginRight={"20px"}>
                                <h5>Đơn thuốc</h5>
                            </Grid>
                            <Grid item xs={12} sm={6} marginLeft={"20px"} marginRight={"20px"}>
                                <TableContainer component={Paper}>
                                    <Table sx={{minWidth: 650, backgroundColor: "rgb(234 239 241)"}}
                                           aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>STT</TableCell>
                                                <TableCell align="center">Tên thuốc</TableCell>
                                                <TableCell align="center">Số lượng</TableCell>
                                                <TableCell align="center">Đơn vị</TableCell>
                                                <TableCell align="center">Cách sử dụng</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {listMedicine.map((item, index) => (
                                                <TableRow
                                                    key={item.medicineName}
                                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell align="left">{item?.medicineName}</TableCell>
                                                    <TableCell align="center">{item?.quantity}</TableCell>
                                                    <TableCell align="center">{item?.unit}</TableCell>
                                                    <TableCell align="center">{item?.useNote}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton aria-label="delete" onClick={() => {
                                                            handleDeleteMedicine(index)
                                                        }}><DeleteIcon/></IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                key={listMedicine.length + 1}
                                            >
                                                <TableCell component="th" scope="row">{listMedicine.length + 1}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Autocomplete
                                                        marginLeft={"20px"}
                                                        marginRight={"20px"}
                                                        disablePortal
                                                        id="medicineSelect"
                                                        options={medicine}
                                                        getOptionLabel={(option) => option?.medicineName}
                                                        sx={{width: 400}}
                                                        renderInput={(params) => <TextField {...params}
                                                                                            label="Chọn thuốc"/>}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <TextField
                                                        autoComplete="number"
                                                        fullWidth
                                                        id="quantity"
                                                        sx={{width: 150}}
                                                        type={"number"}
                                                        label="Số lượng"
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Autocomplete
                                                        marginLeft={"20px"}
                                                        marginRight={"20px"}
                                                        disablePortal
                                                        id="unit"
                                                        sx={{width: 150}}
                                                        options={unitMedicine}
                                                        renderInput={(params) => <TextField {...params}
                                                                                            label="Đơn vị"/>}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <TextField
                                                        autoComplete="useNote"
                                                        fullWidth
                                                        id="useNote"
                                                        type={"text"}
                                                        label="Sử dụng"
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton aria-label="save"
                                                                onClick={handleSaveMedicineDetail}><SaveAltIcon/></IconButton>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Button type={"submit"} variant="contained" color="success" sx={{marginTop: "20px"}}>Lưu đơn thuốc</Button>
                            <Button type={"button"} variant="contained" color="primary" sx={{marginTop: "20px"}} onClick={createPDF}>In file</Button>
                        </Box>
                        <div className="border" style={{height: "auto", marginTop: "20px", borderRadius: "5px"}}>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ResultTyping;