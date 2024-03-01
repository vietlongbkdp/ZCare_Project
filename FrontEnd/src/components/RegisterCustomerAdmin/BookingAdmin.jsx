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
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import Cookies from "js-cookie";
import Loading from "../Loading/Loading";
import {ApiContext} from "../ApiContext/ApiProvider";
import {differenceInYears} from "date-fns";


const schemaBooking = yup.object().shape({
    customerName: yup.string()
        .required("Tên không được để trống")
        .min(2, "Tên phải tối thiểu 2 kí tự"),
    // gender: yup.string()
    //     .required("Hãy lựa chọn giới tính"),
    dobCus: yup.string()
        .required("Ngày sinh không được để trống")
        .test("dob", "Bạn phải lớn hơn 15 tuổi", function (value) {
            return differenceInYears(new Date(), new Date(value)) >= 15;
        })
        .test("dob", "Tuổi không hợp lệ", function (value) {
            return differenceInYears(new Date(), new Date(value)) <= 120;
        }),
    emailCus:yup.string()
        .required("email không được để trống")
        .email("email phải đúng định dạng"),
    address: yup.string()
        .required("Địa chỉ không được để trống")
        .min(5, 'Địa chỉ phải trên 5 ký tự')
        .max(100, 'Địa chỉ phải ít hơn 100 ký tự'),
    phoneCus: yup.string()
        .required("Số điện thoại không được để trống"),
})
export default function BookingAdmin(){
    const { scheduleId, day,month,year } = useParams();
    const bookDay = day + "/" + month + "/" + year;
    const userId = Cookies.get('userId');
    const [schedule,setSchedule]=useState('');
    const [gender, setGender] = useState('MALE');
    const [selectedGender, setSelectedGender] = useState('MALE');
    const [loading, setLoading] = useState(true);
    const { API } = useContext(ApiContext)
    const handleGenderChange = (event) => {
        const selectedGender = event.target.value;
        setSelectedGender(selectedGender);
        setGender(selectedGender);
    };
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API}/api/schedule/get/${scheduleId}`)
            .then(response => {
                setSchedule(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
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
        const fullData = {
            ...data,
            gender:gender,
            scheduleId,
            bookDay,
            userId
        }
        setLoading(true);
        try {
            await axios.post(`${API}/api/booking/admin`, fullData);
            toast.success("Đặt lịch thành công");
            reset();
            setLoading(false);
            navigate(`/clinicadmin/booking`);
        } catch (error) {
            toast.error("Đặt lịch thất bại");
            console.error(error);
            setLoading(false);
        }
    }

    return(
        <>
            {loading && <Loading/>}
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
                                Giá khám: {schedule && schedule.doctor.fee ? (schedule.doctor.fee * 1000).toLocaleString() + " đ" : ""}/lượt
                            </Typography>
                        </Stack>
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
                                                    label={"Họ và tên"}
                                                    {...register("customerName")}
                                                    error={Boolean(errors.customerName)}
                                                    helperText={errors.customerName?.message || ''}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons"
                                                    name="radioGender"
                                                    row
                                                    value={selectedGender}
                                                    onChange={handleGenderChange}
                                                >
                                                    <FormControlLabel value="MALE" control={<Radio />} label="Nam" />
                                                    <FormControlLabel value="FEMALE" control={<Radio />} label="Nữ" />
                                                    <FormControlLabel value="OTHER" control={<Radio />} label="Khác" />
                                                </RadioGroup>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextField
                                                    fullWidth
                                                    id="dobCus"
                                                    type={"date"}
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
                                                    id="emailCus"
                                                    label="email"
                                                    autoComplete="email"
                                                    {...register("emailCus")}
                                                    error={Boolean(errors.emailCus)}
                                                    helperText={errors.emailCus?.message || ''}
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
                                                    <Box sx={{backgroundColor: "#f6f6f6", padding: "16px"}}>
                                                        <Stack my={1} direction="row" flexWrap="wrap"
                                                               justifyContent={"space-between"}>
                                                            <Typography>Giá khám</Typography>
                                                            <Typography>{schedule && schedule.doctor.fee ? (schedule.doctor.fee * 1000).toLocaleString() + " đ" : ""}</Typography>
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
                                                                        fontWeight={"bold"}>{schedule && schedule.doctor.fee ? (schedule.doctor.fee * 1000).toLocaleString() + " đ" : ""}</Typography>
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
        </>
    )
}