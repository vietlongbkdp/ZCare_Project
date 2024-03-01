import React, {useContext, useEffect, useState} from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {FormControl, InputLabel, MenuItem, Paper, Select, TextField} from "@mui/material";
import { House } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {toast} from "react-toastify";
import moment from 'moment';
import {Link} from "react-router-dom";
import Cookies from "js-cookie";
import Loading from "../Loading/Loading";
import {ApiContext} from "../ApiContext/ApiProvider";
import {differenceInYears} from "date-fns";

const schema = yup.object().shape({
    fullName: yup.string()
        .required("Tên không được để trống")
        .min(2, 'Nhập trên 2 kí tự')
        .max(200, 'Nhập dưới 200 kí tự'),
    address: yup.string()
        .required("Địa chỉ không được để trống")
        .min(5, 'Địa chỉ phải trên 5 ký tự')
        .max(100, 'Địa chỉ phải ít hơn 100 ký tự'),
    email: yup.string()
        .required("Email không được để trống")
        .matches(/^.+@.+\..+$/, "Email không hợp lệ"),
    phone: yup.string()
        .required("Số điện thoại không được để trống")
        .matches(/^(02|03|07|09)\d{8}$/, "Số điện thoại bắt đầu bằng 02;03;07;09 và gồm 10 chữ số"),
    dob: yup.string()
        .required("Ngày sinh không được để trống")
        .test("dob", "Bạn phải lớn hơn 15 tuổi", function (value) {
            return differenceInYears(new Date(), new Date(value)) >= 15;
        })
        .test("dob", "Tuổi không hợp lệ", function (value) {
            return differenceInYears(new Date(), new Date(value)) <= 120;
        }),
})


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none'
}));

function CustomerDashboard() {
    const [gender, setGender] = useState("");
    const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({ resolver: yupResolver(schema) });
    const UserId = Cookies.get('userId');
    const [loading, setLoading] = useState(true);
    const { API } = useContext(ApiContext)
    useEffect(() => {
        if (UserId) {
            const getCustomer = async () => {
                const res = await axios.get(`${API}/api/customer/${UserId}`);
                const result = await res.data;
                setValue("fullName", result.fullName)
                setValue("gender",setGender(result.gender))
                setValue("email", result.email)
                setValue("phone", result.phone)
                setValue("dob",moment(result.dob).format('DD/MM/YYYY'))
                setValue("address", result.address)
                setValue("user", result.user)
                setLoading(false)
            }
            getCustomer();
        }
    }, [UserId, setValue]);


    const handleUpdateCustomer = async (data) => {
        setLoading(true)
        const obj={
            ...data,
            gender:gender
        }
        try {
            await axios.put(`${API}/api/customer/${UserId}`, obj);
            toast.success("Cập nhật thông tin thành công!")
            setLoading(false)
        } catch (error) {
            toast.error("Cập nhật thông tin thất bại!")
            setLoading(false)
        }
    };

    const menuItemStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
    };

    return (
        <div>
            {loading && <Loading/>}
            <Header/>
            <div className="d-flex justify-content-center align-items-center"
                 style={{backgroundColor: "rgb(237 255 250)", height: "150px"}}>
                <h2>THÔNG TIN CÁ NHÂN</h2>
            </div>
            <Container sx={{justifyContent: 'center', py: 3}}>
                <Link to="/home" underline="none" sx={{textDecoration: 'none'}}>
                    <House sx={{marginRight: '0.5rem'}}/>
                    <Typography variant="body1" sx={{marginLeft: '0.5rem', display: 'inline', height: '30px'}}>
                        / Thông tin cá nhân
                    </Typography>
                </Link>
                <Typography variant="h4" mt={3} component="h4">Thông tin cá nhân</Typography>
                <Box component="form" onSubmit={handleSubmit(handleUpdateCustomer)} sx={{width: '100%'}} mt={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Item>
                                <Box sx={{mt: 3}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="fullName"
                                                fullWidth
                                                id="fullName"
                                                label="Tên"
                                                type="text"
                                                InputLabelProps={{shrink: true}}
                                                error={Boolean(errors.fullName)}
                                                helperText={errors.fullName?.message || ''}
                                                {...register('fullName')}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="address"
                                                fullWidth
                                                id="address"
                                                type={"text"}
                                                label="Địa chỉ"
                                                InputLabelProps={{shrink: true}}
                                                error={Boolean(errors.address)}
                                                helperText={errors.address?.message || ''}
                                                {...register("address")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="phone"
                                                fullWidth
                                                id="phone"
                                                type={"text"}
                                                label="số điện thoại"
                                                InputLabelProps={{shrink: true}}
                                                error={Boolean(errors.phone)}
                                                helperText={errors.phone?.message || ''}
                                                {...register("phone")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="email"
                                                fullWidth
                                                id="email"
                                                label="Email"
                                                InputLabelProps={{shrink: true}}
                                                error={Boolean(errors.email)}
                                                helperText={errors.email?.message || ''}
                                                {...register("email")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                                                <Select
                                                    fullWidth
                                                    autoComplete="gender"
                                                    id="gender"
                                                    labelId="demo-simple-select-label"
                                                    label="Giới tính"
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    renderValue={(selected) => (
                                                        <div style={menuItemStyle}>
                                                            {selected === 'MALE' ? 'Nam' : selected === 'FEMALE' ? 'Nữ' : 'Khác'}
                                                        </div>
                                                    )}
                                                >
                                                    <MenuItem value="MALE">Nam</MenuItem>
                                                    <MenuItem value="FEMALE">Nữ</MenuItem>
                                                    <MenuItem value="OTHER">Khác</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="dob"
                                                fullWidth
                                                id="dob"
                                                type={"text"}
                                                InputLabelProps={{shrink: true}}
                                                label="Ngày sinh"
                                                error={Boolean(errors.dob)}
                                                helperText={errors.dob?.message || ''}
                                                {...register("dob")}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid item container xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    type="submit"
                                    sx={{mt: 3, mb: 1, mr: 1}}
                                >
                                    Cập nhật
                                </Button>
                                <Link to="/home" style={{ textDecoration: "none" }}>
                                    <Button variant="contained"
                                            sx={{mt: 3, mb: 1}}>
                                        Hủy
                                    </Button>
                                </Link>

                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer/>
        </div>
    );
}

export default CustomerDashboard;