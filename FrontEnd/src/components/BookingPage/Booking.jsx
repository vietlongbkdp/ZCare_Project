import Container from '@mui/material/Container';
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import React, {useContext, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Paper, TextField} from "@mui/material";
import {styled} from "@mui/material/styles";
import { useForm } from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Swal from 'sweetalert2';
import Loading from "../Loading/Loading";
import dayjs from "dayjs";
import {ApiContext} from "../ApiContext/ApiProvider";
import {toast} from "react-toastify";

const schemaBooking = yup.object().shape({
    customerName: yup.string()
        .required("Tên không được để trống")
        .min(2, 'Nhập trên 2 kí tự')
        .max(40, 'Tên quá dài'),
    gender: yup.string()
        .required("Hãy lựa chọn giới tính"),
    dobCus: yup
        .string()
        .required("Cần nhập ngày sinh")
        .test('is-valid-dob', 'Ngày sinh phải lớn hơn ngày hiện tại', function(value) {
            const currentDate = new Date();
            const selectedDate = new Date(value);
            return selectedDate < currentDate;
        }),
    address: yup.string()
        .required("Địa chỉ không được để trống")
        .min(5, 'Địa chỉ quá ngắn')
        .max(100, 'Địa chỉ quá dài'),
    phoneCus: yup.string()
        .required("Số điện thoại không được để trống"),
        // .matches(/^(02|03|07|09)\d{8}$/, "Số điện thoại bắt đầu bằng 02;03;07;09 và gồm 10 chữ số"),
})
export default function Booking(){
    const { scheduleId, day,month,year } = useParams();
    const { API } = useContext(ApiContext)
    const bookDay = dayjs().locale('vi').set('date', day).set('month', month - 1).set('year', year).format('D/M/YYYY');
    const userId = Cookies.get('userId');
    const [schedule,setSchedule]=useState('');
    const [bookFor, setBookFor] = useState("me")
    const [quantityBooking, setQuantityBooking] = useState(0);
    const handleChangeBookFor =(event) =>{
        setBookFor(event.target.value)
    }
    const navigate = useNavigate();
    const [gender, setGender] = useState(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`${API}/api/customer/get/`+ userId).then(response => {
            const [year, month, day] = response.data.dob;
            const dob = new Date(year, month - 1, day);
            setValue("customerName", response.data.fullName)
            setValue("address", response.data.address)
            setValue("phoneCus", response.data.phone)
            setValue("gender", response.data.gender)
            setValue("dobCus", dob.toISOString().split('T')[0])
            console.log(response.data);
            setGender(response.data.gender)
            setLoading(false)
        })
            .catch(error => {
                console.error(error);
                setLoading(false)
            });
    }, []);

    useEffect(() => {
        axios.get(`${API}/api/schedule/get/${scheduleId}`)
            .then(response => {
                setSchedule(response.data);
                setLoading(false)
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false)
            });
    }, []);
    useEffect(() => {
        axios.get(`${API}/api/booking/notDone/${userId}`)
            .then(response => {
                setQuantityBooking(response.data);
                setLoading(false)
            })
            .catch(error => {
                console.error('Lỗi lấy Booking chưa hoàn thành:', error);
                setLoading(false)
            });
    }, []);

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const {register, handleSubmit, formState: { errors }, reset,setValue} = useForm({resolver: yupResolver(schemaBooking)})
    async function createBooking(data){
        if(quantityBooking >=3){
            toast.error("Xin lỗi, chúng tôi giới hạn số lượng lịch hẹn khám là 3, bạn có thể đă thêm khi các lịch khám khác đã hoàn thành")
        }else{
            setLoading(true)
            const fullData = {
                ...data,
                scheduleId,
                bookDay,
                userId
            }
            const res = await axios({
                method: 'post',
                url: `${API}/api/booking`,
                data: {...fullData}
            });
            if(res.status == '200'){
                Swal.fire({
                    title: "Bạn đã đặt lịch thành công!",
                    text: "Vui lòng kiểm tra mail để xác nhận đặt khám!",
                    footer: 'Lịch khám sẽ bị huỷ sau 5 phút nếu chưa được xác nhận!'
                })
                navigate('/appointment-schedule')
                setLoading(false)
            }
        }
    }
    return(
        <>
            {loading && <Loading/>}
            <Header/>
            <div className="d-flex justify-content-center align-items-center"
                 style={{backgroundColor: "rgb(237 255 250)", height: "150px"}}>
                <h2>ĐẶT LỊCH KHÁM BỆNH</h2>
            </div>
            <Container maxWidth="md" sx={{marginTop: 1}}>
                <Stack>
                    <Stack direction={"row"} px={5} py={2} sx={{backgroundColor: "#f6f6f6"}}>
                        <Stack mr={3}>
                            <Avatar
                                alt="Avatar"
                                src={schedule?.doctor?.avatarImg}
                                sx={{width: 80, height: 80}}
                            />
                        </Stack>
                        <Stack>
                            <Typography variant="h6">
                                ĐẶT LỊCH KHÁM
                            </Typography>
                            <Link href="#" sx={{textDecoration: "none", fontWeight: "bold", fontSize: "20px"}}>
                                {schedule?.doctor?.doctorName}
                            </Link>
                            <Typography variant="p">
                                {schedule?.timeItem} - {schedule?.weekday} - {bookDay}
                            </Typography>
                            <Typography variant="h7" fontWeight={"bold"}>
                                Giá khám: {schedule && schedule?.doctor?.fee ? (schedule?.doctor?.fee * 1000).toLocaleString() + " đ" : ""}/lượt
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack mt={2} alignItems={"center"} hidden >
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            row
                            value={bookFor}
                            onChange={(event) => {
                                handleChangeBookFor(event)
                            }}
                        >
                            <FormControlLabel value="me" control={<Radio/>} label="Đặt lịch cho mình"/>
                            <FormControlLabel value="friend" control={<Radio/>} label="Đặt lịch cho người thân"/>
                        </RadioGroup>
                    </Stack>
                    <Stack>
                        <Box sx={{width: '100%'}}>
                            <Grid container>
                                <Item>
                                    <Box component="form" onSubmit={handleSubmit(createBooking)} sx={{mt: 3}}>
                                        <Grid container spacing={2} justifyContent={"center"}>
                                            <Grid item xs={10}>
                                                <TextField
                                                    autoComplete="given-name"
                                                    fullWidth
                                                    id="customerName"
                                                    label={(bookFor === "me") ? "Họ và tên" : "Họ và tên người đặt"}
                                                    {...register("customerName")}
                                                    error={Boolean(errors.customerName)}
                                                    helperText={errors.customerName?.message || ''}
                                                    disabled={true}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                            {(bookFor === "me") ? "" :
                                                (<Grid item xs={10}>
                                                    <TextField
                                                        autoComplete="given-name"
                                                        fullWidth
                                                        id="patientName"
                                                        label="Họ và tên bệnh nhân"
                                                        {...register("patientName")}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </Grid>)}
                                            <Grid item xs={10}>
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons"
                                                    name="radioGender"
                                                    row
                                                    value={gender}
                                                    {...register("gender")}
                                                    error={Boolean(errors.gender)}
                                                    helperText={errors.gender?.message || ''}
                                                >
                                                    <FormControlLabel value="MALE" control={<Radio/>} label="Nam"/>
                                                    <FormControlLabel value="FEMALE" control={<Radio/>} label="Nữ"/>
                                                    <FormControlLabel value="OTHER" control={<Radio/>} label="Khác"/>
                                                </RadioGroup>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextField
                                                    fullWidth
                                                    id="dobCus"
                                                    type={"date"}
                                                    disabled={true}
                                                    label={"Ngày sinh"}
                                                    {...register("dobCus")}
                                                    error={Boolean(errors.dobCus)}
                                                    helperText={errors.dobCus?.message || ''}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextField
                                                    fullWidth
                                                    id="phoneCus"
                                                    label="Số điện thoại"
                                                    autoComplete="phone"
                                                    disabled={true}
                                                    {...register("phoneCus")}
                                                    error={Boolean(errors.phoneCus)}
                                                    helperText={errors.phoneCus?.message || ''}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}

                                                />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextField
                                                    fullWidth
                                                    id="address"
                                                    label="Địa chỉ liên hệ"
                                                    disabled={true}
                                                    autoComplete="address"
                                                    {...register("address")}
                                                    error={Boolean(errors.address)}
                                                    helperText={errors.address?.message || ''}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextField
                                                    fullWidth
                                                    id="reason"
                                                    label="Lý do khám (Mô tả triệu chứng)"
                                                    autoComplete="text"
                                                    {...register("reason")}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Stack>
                                                    <Stack>
                                                        <Typography variant="p"
                                                                    sx={{fontWeight: "bold", color: "#337ab7"}}
                                                                    textAlign={"left"}>
                                                            Hình thức thanh toán:
                                                        </Typography>
                                                        <RadioGroup
                                                            aria-labelledby="radio-payment"
                                                            name="radioPay"
                                                            row
                                                            defaultValue={"1"}
                                                        >
                                                            <FormControlLabel value="1" control={<Radio/>}
                                                                              label="Thanh toán sau tại cơ sở y tế"/>
                                                        </RadioGroup>
                                                    </Stack>
                                                    <Box sx={{backgroundColor: "#f6f6f6", padding: "16px"}}>
                                                        <Stack my={1} direction="row" flexWrap="wrap"
                                                               justifyContent={"space-between"}>
                                                            <Typography>Giá khám</Typography>
                                                            <Typography>{schedule && schedule?.doctor?.fee ? (schedule?.doctor?.fee * 1000).toLocaleString() + " đ" : ""}</Typography>
                                                        </Stack>
                                                        <Stack my={1} direction="row" flexWrap="wrap"
                                                               justifyContent={"space-between"}>
                                                            <Typography>Phí đặt lịch</Typography>
                                                            <Typography>Miễn phí</Typography>
                                                        </Stack>
                                                        <Stack sx={{
                                                            borderTop: "solid",
                                                            borderWidth: "1px",
                                                            paddingTop: "10px"
                                                        }} my={1} direction="row" flexWrap="wrap"
                                                               justifyContent={"space-between"}>
                                                            <Typography>Tổng cộng</Typography>
                                                            <Typography color={"red"}
                                                                        fontWeight={"bold"}>{schedule && schedule?.doctor?.fee ? (schedule?.doctor?.fee * 1000).toLocaleString() + " đ" : ""}</Typography>
                                                        </Stack>
                                                    </Box>
                                                    <Typography variant="p" sx={{fontStyle: "italic", color: "#337ab7"}}
                                                                my={1}>
                                                        Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian
                                                        làm thủ tục khám
                                                    </Typography>
                                                    <Box sx={{backgroundColor: "#d4effc", padding: "16px"}}>
                                                        <Stack my={1} direction="row" flexWrap="wrap"
                                                               justifyContent={"space-between"}>
                                                            <Typography variant="h6">LƯU Ý</Typography>
                                                        </Stack>
                                                        <Stack my={1} direction="row" flexWrap="wrap"
                                                               justifyContent={"space-between"}>
                                                            <Typography textAlign={"left"}>Thông tin anh/chị cung cấp sẽ
                                                                được sử dụng làm hồ sơ khám bệnh, khi điền thông tin
                                                                anh/chị vui lòng:</Typography>
                                                        </Stack>
                                                        <Stack my={1} marginLeft={"15px"} direction="column">
                                                            <Typography mt={1} textAlign={"left"}> - Ghi rõ họ và tên,
                                                                viết hoa những chữ cái đầu tiên, ví dụ: Trần Văn
                                                                Phú </Typography>
                                                            <Typography mt={1} textAlign={"left"}> - Điền đầy đủ, đúng
                                                                và vui lòng kiểm tra lại thông tin trước khi ấn "Xác
                                                                nhận"</Typography>
                                                        </Stack>
                                                    </Box>
                                                </Stack>

                                            </Grid>
                                            <Grid item container xs={10}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color={"warning"}
                                                    sx={{mt: 3, mb: 1}}
                                                    fullWidth
                                                >
                                                    Xác nhận đặt lịch
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Item>
                            </Grid>
                        </Box>
                    </Stack>
                </Stack>

            </Container>
            <Footer/>
        </>
    )
}