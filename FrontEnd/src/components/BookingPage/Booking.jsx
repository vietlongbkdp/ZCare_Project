import Container from '@mui/material/Container';
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import {useState} from "react";
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
import dayjs from "dayjs";

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
    const scheduleId = 1;
    // const bookDay = dayjs("2024/01/25").format('DD/MM/YYYY')
    const bookDay = "25/01/2024"
    const idCustomer = 1;
    const [bookFor, setBookFor] = useState("me")
    const handleChangeBookFor =(event) =>{
        setBookFor(event.target.value)
    }
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const {register, handleSubmit, formState: { errors }, reset} = useForm({resolver: yupResolver(schemaBooking)})
    async function createBooking(data){
        const fullData = {
            ...data,
            scheduleId,
            bookDay,
            idCustomer
        }
        console.log(fullData)
        const res = await axios({
            method: 'post',
            url: 'http://localhost:8080/api/booking',
            data: {...fullData}
        });
            if(res.status === '200'){
                toast.success("Bạn đã đặt lịch thành công!")
                // reset();
            }
    }
    // console.log("hello")
    return(
        <Container maxWidth="md">
            <Stack>
                <Stack direction={"row"} px={5} py={2} sx={{backgroundColor: "#f6f6f6"}}>
                    <Stack mr={3}>
                        <Avatar
                            alt="Avatar"
                            src="https://i1.sndcdn.com/artworks-000234186668-o1elkt-t500x500.jpg"
                            sx={{ width: 80, height: 80 }}
                        />
                    </Stack>
                    <Stack>
                        <Typography variant="h6">
                            ĐẶT LỊCH KHÁM
                        </Typography>
                        <Link href="#" sx={{textDecoration: "none", fontWeight: "bold", fontSize: "20px"}}>
                            Bác sĩ Chuyên khoa I Hàng Quốc Đạt

                        </Link>
                        <Typography variant="p">
                            16:30 - 17:00 - Thứ 2 - 22/01/2024
                        </Typography>
                        <Typography variant="h7" fontWeight={"bold"}>
                            Giá khám: 300.000 đồng/lượt
                        </Typography>
                    </Stack>
                </Stack>
                <Stack mt={2} alignItems={"center"}>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        row
                        value={bookFor}
                        onChange={(event) =>{handleChangeBookFor(event)}}
                    >
                        <FormControlLabel value="me" control={<Radio />} label="Đặt lịch cho mình" />
                        <FormControlLabel value="friend" control={<Radio />} label="Đặt lịch cho người thân" />
                    </RadioGroup>
                </Stack>
                <Stack>
                    <Box  sx={{width: '100%'}}>
                        <Grid container>
                            <Item >
                                <Box component="form" onSubmit={handleSubmit(createBooking)} sx={{ mt: 3 }}>
                                    <Grid container spacing={2}  justifyContent={"center"}>
                                        <Grid item xs={10}>
                                            <TextField
                                                autoComplete="given-name"
                                                fullWidth
                                                id="customerName"
                                                label={(bookFor ==="me")?"Họ và tên":"Họ và tên người đặt"}
                                                {...register("customerName")}
                                                error={Boolean(errors.customerName)}
                                                helperText={errors.customerName?.message || ''}
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
                                                />
                                            </Grid>)}
                                        <Grid item xs={10}>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons"
                                                name="radioGender"
                                                row
                                                defaultValue={"MALE"}
                                                {...register("gender")}
                                                error={Boolean(errors.gender)}
                                                helperText={errors.gender?.message || ''}

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
                                            />
                                        </Grid>
                                        <Grid item xs={10}>
                                            <TextField
                                                fullWidth
                                                id="reason"
                                                label="Lý do khám (Mô tả triệu chứng)"
                                                autoComplete="text"
                                                {...register("reason")}
                                            />
                                        </Grid>
                                        <Grid item xs={10} >
                                            <Stack>
                                                <Stack>
                                                    <Typography variant="p" sx={{fontWeight: "bold",color: "#337ab7"}} textAlign={"left"}>
                                                        Hình thức thanh toán:
                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="radio-payment"
                                                        name="radioPay"
                                                        row
                                                        defaultValue={"1"}
                                                    >
                                                        <FormControlLabel value="1" control={<Radio />} label="Thanh toán sau tại cơ sở y tế" />
                                                    </RadioGroup>
                                                </Stack>
                                                <Box sx={{backgroundColor: "#f6f6f6", padding: "16px"}}>
                                                    <Stack my={1} direction="row" flexWrap="wrap" justifyContent={"space-between"}>
                                                        <Typography>Giá khám</Typography>
                                                        <Typography>300.000 đồng</Typography>
                                                    </Stack>
                                                    <Stack my={1} direction="row" flexWrap="wrap" justifyContent={"space-between"}>
                                                        <Typography>Phí đặt lịch</Typography>
                                                        <Typography>Miễn phí</Typography>
                                                    </Stack>
                                                    <Stack  sx={{borderTop: "solid", borderWidth:"1px", paddingTop: "10px"}} my={1} direction="row" flexWrap="wrap" justifyContent={"space-between"}>
                                                        <Typography>Tổng cộng</Typography>
                                                        <Typography color={"red"} fontWeight={"bold"}>300.000 đồng</Typography>
                                                    </Stack>
                                                </Box>
                                                <Typography variant="p" sx={{fontStyle:"italic", color: "#337ab7"}} my={1}>
                                                    Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ tục khám
                                                </Typography>
                                                <Box sx={{backgroundColor: "#d4effc", padding: "16px"}}>
                                                    <Stack my={1} direction="row" flexWrap="wrap" justifyContent={"space-between"}>
                                                        <Typography variant="h6">LƯU Ý</Typography>
                                                    </Stack>
                                                    <Stack my={1} direction="row" flexWrap="wrap" justifyContent={"space-between"}>
                                                        <Typography textAlign={"left"}>Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, khi điền thông tin anh/chị vui lòng:</Typography>
                                                    </Stack>
                                                    <Stack  my={1} marginLeft={"15px"} direction="column" >
                                                        <Typography mt={1} textAlign={"left"}> - Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: Trần Văn Phú </Typography>
                                                        <Typography mt={1} textAlign={"left"}> - Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn "Xác nhận"</Typography>
                                                    </Stack>
                                                </Box>
                                            </Stack>

                                        </Grid>
                                        <Grid item container xs={10}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color={"warning"}
                                                sx={{ mt: 3, mb: 1}}
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
    )
}