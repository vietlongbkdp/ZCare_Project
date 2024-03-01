import React, {useContext, useEffect, useState} from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import IconButton from '@mui/material/IconButton';
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
import {Checkbox, TextareaAutosize, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Autocomplete from '@mui/material/Autocomplete';
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import {useNavigate, useParams} from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import FormControlLabel from "@mui/material/FormControlLabel";
import Loading from "../Loading/Loading";
import {ApiContext} from "../ApiContext/ApiProvider";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
const schema = yup.object().shape({
    diagResult: yup.string().required("Kết quả không được để trống"),
    advice: yup.string().required("Bác sĩ cần đưa ra lời khuyên cho bệnh nhân")
});
function ResultTyping() {
    const {idCustomer, idDoctor, idBooking} = useParams();
    const [customer, setCustomer] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [clinic, setClinic] = useState(null);
    const [medicine, setMedicine] = useState(null);
    const [listMedicine, setListMedicine] = useState([])
    const [morningChecked, setMorningChecked] = useState(false);
    const [afternoonChecked, setAfternoonChecked] = useState(false);
    const [eveningChecked, setEveningChecked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [gender, setGender] = useState(null)
    const navigate = useNavigate();
    const { API } = useContext(ApiContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCustomer = await axios.get(`${API}/api/customer/getCustomer/` + idCustomer);
                setCustomer(responseCustomer.data);
                console.log(responseCustomer.data.gender)
                if(responseCustomer.data.gender === 'MALE'){
                    setGender('Nam')
                }else if(responseCustomer.data.gender === 'FEMALE'){
                    setGender('Nữ')
                } else if(responseCustomer.data.gender === 'OTHER'){
                    setGender('Khác')
                }
                setLoading(false)
            } catch (errorCustomer) {
                console.error('Lỗi lấy Customer:', errorCustomer);
                setLoading(false)
            }
            try {
                const responseClinic = await axios.get(`${API}/api/clinic/getClinicbyIdDoctor/` + idDoctor);
                setClinic(responseClinic.data);
                setLoading(false)
            } catch (errorClinic) {
                console.error('Lỗi lấy Clinic:', errorClinic);
                setLoading(false)
            }

            try {
                const responseDoctor = await axios.get(`${API}/api/doctor/` + idDoctor);
                setDoctor(responseDoctor.data);
                setLoading(false)
            } catch (errorDoctor) {
                console.error('Lỗi lấy Doctor:', errorDoctor);
                setLoading(false)
            }

            try {
                const responseMedicine = await axios.get(`${API}/api/medicine`);
                setMedicine(responseMedicine.data);
                setLoading(false)
            } catch (errorMedicine) {
                console.error('Lỗi lấy Medicine:', errorMedicine);
                setLoading(false)
            }
        };

        fetchData();
    }, []);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema),});
    const unitMedicine = ["Viên", "Vỉ", "Hộp", "Chai", "Gói"]
    const onSubmit = async (data) => {
        try {
            const responseBookingStatus = await axios.get(`${API}/api/booking/getBookingById/` + idBooking);
            if(responseBookingStatus.data === 'EXAMINING'){
                Swal.fire({
                    title: "Vui lòng kiểm tra kỹ thông tin phiếu khám bệnh trước khi lưu",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Đồng ý!",
                    cancelButtonText: "Huỷ"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        setLoading(true);
                        const dataNew = {
                            ...data,
                            idBooking: idBooking,
                            medicineList: listMedicine
                        };
                        try {
                            const blob = await getFilePDF(dataNew, customer, doctor);
                            const formData = new FormData();
                            formData.append('file', blob, `${customer?.fullName} _ ${dayjs().format("DD/MM/YYYY")}.pdf`);
                            formData.append('data', JSON.stringify(dataNew));

                            const resp = await axios.post(`${API}/api/result`, formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            });
                            if (resp.status === 200) {
                                openBlob(blob);
                                toast.success('Đã tạo được đơn thuốc');
                                reset();
                                setListMedicine([]);
                                setLoading(false)
                                navigate(`/doctoradmin/bookingHistory`);
                            } else {
                                toast.error('Có lỗi, chưa lưu được');
                                setLoading(false)
                            }
                        } catch (error) {
                            console.error(error);
                            toast.error('Có lỗi xảy ra');
                            setLoading(false)
                        }
                    }
                });

            }else{
                toast.error('Đã trả kết quả khám trước đó rồi, vui lòng kiểm tra lại!!!')
            }
        } catch (errorBooking) {
            console.error('Lỗi lấy Booking:', errorBooking);
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


        const selectedValues = [];


        if (morningChecked) {
            selectedValues.push("Sáng");
        }
        if (afternoonChecked) {
            selectedValues.push("Chiều");
        }
        if (eveningChecked) {
            selectedValues.push("Tối");
        }


        const concatenatedValues = selectedValues.join(", ");
        console.log(morningChecked)

        if(medicineName === ""|| isNaN(quantity) || unit === ""|| useNote === ""){
            toast.error("Cần nhập đầy đủ thông tin thuốc")
        }else if(quantity < 1 || quantity > 200){
            toast.error("Số lượng phải từ 1 đến 200")
        }
            else{
            if(checkExistMedicine(listMedicine, medicineName) === false){
                setListMedicine([
                    ...listMedicine,
                    {
                        medicineName: medicineName,
                        quantity: quantity,
                        unit: unit,
                        dosage: concatenatedValues,
                        useNote: useNote
                    }
                ])
                document.getElementById("quantity").value = "";
                document.getElementById("useNote").value = "";
                setMorningChecked(false);
                setAfternoonChecked(false);
                setEveningChecked(false);

            }else{
                toast.error("Thuốc này đã tồn tại")
            }
        }
    }

    console.log(listMedicine)
    const handleDeleteMedicine = (index) =>{
        Swal.fire({
            title: "Bạn có chắc chắn muốn xoá khỏi đơn thuốc",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Xác nhận!",
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
    async function getImageBase64(url) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error('Error loading image:', error);
            return null;
        }
    }
    const urlImageClinic = clinic?.clinicLogo;
    async function getFilePDF(data, customer, doctor) {
        const documentDefinition = {
            content: [
                {
                    columns: [
                                {
                                    image: await getImageBase64(urlImageClinic),
                                    width: 120,
                                    margin: [30, 0, 10, 20] // margin left-top-right-bottom
                                },
                                {
                                    stack:[
                                        {
                                            text: clinic.clinicName.toUpperCase(),
                                            bold: true,
                                            fontSize: 11,
                                        },
                                        {
                                            text: 'Địa chỉ: ' + clinic.address,
                                            fontSize: 10,
                                        },
                                        {
                                            text: 'Hotline: ' + clinic.hotline,
                                            fontSize: 10,
                                        },
                                        {
                                            text: 'GPKD: ' + clinic.operatingLicence,
                                            fontSize: 10,
                                        },
                                        {
                                            text: 'Email: ' + clinic.email,
                                            fontSize: 10,
                                        },
                                    ],
                                    width: '*' ,// Canh đều theo chiều ngang
                                    alignment: 'left'
                                }
                            ],
                    columnGap: 50
                },
                {
                    text: 'KẾT QUẢ KHÁM CHỮA BỆNH',
                    style: 'header'
                },
                {
                    ul: [
                        'Họ và tên bệnh nhân: ' + customer?.fullName,
                        'Tuổi: ' + (parseInt(dayjs().format("YYYY"))-customer?.dob[0]).toString(),
                        'Giới tính: ' + gender,
                        'Số điện thoại: ' + customer?.phone,
                        'Địa chỉ: ' + customer?.address,
                        'Bác sĩ khám: '+ doctor?.doctorName,
                        'Chuyên khoa: '+ doctor?.speciality?.specialtyName,
                        'Ngày khám: '+ dayjs().format("DD/MM/YYYY"),
                        'Kết luận: '+ data.diagResult,
                        'Lời khuyên của bác sĩ: '+ data.advice,
                        'Ghi chú thêm: '+ data.doctorNotice,
                    ],
                    style: 'openSans',
                    margin: [40, 0, 10, 5] // margin left-top-right-bottom
                },
                {
                    text: 'Đơn thuốc',
                    style: 'subHeader'
                },
                {
                    layout: 'lightHorizontalLines lightVerticalLines', // optional
                    table: {
                        headerRows: 1,
                        widths: [ 30, 130, 50 , 50 ,90, 120 ],

                        body: [
                            [ { text: 'Stt', bold: true, alignment: 'center' }, { text: 'Tên thuốc', bold: true, alignment: 'center' }, { text: 'Số lượng', bold: true, alignment: 'center' }, { text: 'Đơn vị', bold: true, alignment: 'center' }, { text: ' Liều lượng', bold: true, alignment: 'center' }, { text: 'Sử dụng', bold: true, alignment: 'center' } ],
                            ...data.medicineList.map(((item, index) => [{text: index+1, alignment: 'center'},{text: item.medicineName}, {text: item.quantity, alignment: 'center'} , {text: item.unit, alignment: 'center'}, {text: item.dosage, alignment: 'center'}, {text: item.useNote, alignment: 'center'}]))]
                    }
                },
                {
                    text: 'Ngày ' + dayjs().format('DD') + ' tháng ' + dayjs().format('MM') + ' năm ' + dayjs().format('YYYY'),
                    italics: true,
                    margin: [300, 15, 0,0],
                    fontSize: 12
                },
                {
                    text: 'Xác nhận của bác sĩ',
                    bold: true,
                    margin: [300, 10, 0,0],
                    fontSize: 15
                },
                {
                    text: doctor?.doctorName,
                    margin: [300, 60, 0,0],
                    italics: true,
                    fontSize: 12
                },
            ],
            styles: {
                header: {
                    fontSize: 25,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 20, 0, 20]
                },
                openSans: {
                    fontFamily: 'Open Sans',
                    lineHeight: 1.5,
                    fontSize: 13,
                },
                subHeader: {
                    fontSize: 20,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 0, 0, 20]
                }
            },
            defaultStyle: {
                font: 'Roboto'
            },
            fonts: {
                OpenSans: {
                    normal: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-U1Ug.ttf',
                    bold: 'https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN_r8OUuhs.ttf',
                    italics: 'https://fonts.gstatic.com/s/opensans/v18/mem6YaGs126MiZpBA-UFUK0Zdcg.ttf',
                    bolditalics: 'https://fonts.gstatic.com/s/opensans/v18/memnYaGs126MiZpBA-UFUKWiUNhrIqY.ttf'
                },
                Roboto: {
                    normal: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2',
                    bold: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4.woff2',
                    italics: 'https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBic4.woff2',
                    bolditalics: 'https://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrIzc4.woff2'
                }
            }
        };
        return new Promise((resolve, reject) => {
            pdfMake.createPdf(documentDefinition).getBlob((blob) => {
                resolve(blob);
            }, (error) => {
                reject(error);
            });
        });
    }
    function openBlob(blob) {
        const url = URL.createObjectURL(blob);
        window.open(url);
    }
    const handleBack = async ()=>{
        navigate(`/doctoradmin/doctorBooking`)
    }
    return (
        <div>
            {loading && <Loading/>}
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
                            <p style={{fontSize: 20, marginLeft: "20px"}}>Giới tính: {gender}</p>
                            <p style={{fontSize: 20, marginLeft: "20px"}}>Số điện thoại: {customer?.phone}</p>
                            <p style={{fontSize: 20, marginLeft: "20px"}}>Địa chỉ: {customer?.address}</p>
                            <Grid item xs={12} sm={6} mb={2} mx={10}>
                                <TextareaAutosize minRows={2}
                                    autoComplete="diagResult"
                                    id="diagResult"
                                    fullWidth
                                    label="Kết quả chuẩn đoán"
                                                  placeholder={"Kết quả chuẩn đoán"}
                                    type="text"
                                    error={Boolean(errors.diagResult)}
                                    helperText={errors.diagResult?.message || ''}
                                    {...register('diagResult')}
                                                  style={{
                                                      width: '100%',
                                                      padding: '10px',
                                                      border: '1px solid #ccc',
                                                      borderRadius: '8px',
                                                      resize: 'vertical',
                                                      background: 'rgb(234 239 241)'
                                                  }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} mb={2} mx={10}>
                                <TextareaAutosize minRows={2}
                                    autoComplete="advice"
                                    fullWidth
                                    id="advice"
                                    type={"text"}
                                                  placeholder={"Lời khuyên điều trị"}
                                    label="Lời khuyên điều trị"
                                    error={Boolean(errors.advice)}
                                    helperText={errors.advice?.message || ''}
                                    {...register("advice")}
                                                  style={{
                                                      width: '100%',
                                                      padding: '10px',
                                                      border: '1px solid #ccc',
                                                      borderRadius: '8px',
                                                      resize: 'vertical',
                                                      background: 'rgb(234 239 241)'
                                                  }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} mb={2} mx={10}>
                                <TextareaAutosize minRows={2}
                                    autoComplete="doctorNotice"
                                    fullWidth
                                    id="doctorNotice"
                                    type={"text"}
                                    label="Ghi chú Bác sĩ"
                                                  placeholder={"Ghi chú Bác sĩ"}
                                    error={Boolean(errors.doctorNotice)}
                                    helperText={errors.doctorNotice?.message || ''}
                                    {...register("doctorNotice")}
                                           style={{
                                               width: '100%',
                                               padding: '10px',
                                               border: '1px solid #ccc',
                                               borderRadius: '8px',
                                               resize: 'vertical',
                                               background: 'rgb(234 239 241)'
                                           }}
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
                                                <TableCell align="center">Liều lượng</TableCell>
                                                <TableCell align="center">Chú thích</TableCell>
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
                                                    <TableCell align="center">
                                                        {item?.dosage}
                                                    </TableCell>
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
                                                        sx={{width: 380}}
                                                        renderInput={(params) => <TextField {...params}
                                                                                            label="Chọn thuốc"/>}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <TextField
                                                        autoComplete="number"
                                                        fullWidth
                                                        id="quantity"
                                                        sx={{width: 120}}
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
                                                        sx={{width: 120}}
                                                        options={unitMedicine}
                                                        renderInput={(params) => <TextField {...params}
                                                                                            label="Đơn vị"/>}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <div role="group" aria-labelledby="sandwich-group">
                                                        <List size="sm">
                                                            <ListItem sx={{ mb: -4, mt: -4 }}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={morningChecked}
                                                                            onChange={(event) => setMorningChecked(event.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Sáng"
                                                                />
                                                            </ListItem>
                                                            <ListItem sx={{ mb: -4 }}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={afternoonChecked}
                                                                            onChange={(event) => setAfternoonChecked(event.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Chiều"
                                                                />
                                                            </ListItem>
                                                            <ListItem sx={{ mb: -4 }}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={eveningChecked}
                                                                            onChange={(event) => setEveningChecked(event.target.checked)}
                                                                        />
                                                                    }
                                                                    label="Tối"
                                                                />
                                                            </ListItem>
                                                        </List>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <TextField
                                                        autoComplete="useNote"
                                                        fullWidth
                                                        id="useNote"
                                                        type={"text"}
                                                        label="Sử dụng"
                                                        sx={{width: '160px'}}
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
                            <Button type={"submit"} variant="contained" color="success" sx={{marginTop: "20px", marginRight: "20px"}}>Lưu đơn thuốc</Button>
                            <Button type={"button"} onClick={handleBack} variant="contained" color="error" sx={{marginTop: "20px", marginRight: "20px"}}>Quay lại</Button>
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