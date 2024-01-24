import React, {useEffect} from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {Link, Paper, TextField} from "@mui/material";
import { House } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ClinicEditor from "../CkEditor/ClinicEditor";
import {styled} from "@mui/material/styles";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {toast} from "react-toastify";
const schema = yup.object().shape({
    clinicName: yup.string()
        .required("Tên không được để trống")
        .min(2, 'Nhập trên 2 kí tự')
        .max(200, 'Nhập dưới 200 kí tự'),
    address: yup.string()
        .required("Địa chỉ không đuược để trống")
        .min(2, 'Nhập trên 2 kí tự')
        .max(200, 'Nhập dưới 200 kí tự'),
    legalRepresentative: yup.string()
        .required("Tên người đại diện không đuược để trống")
        .min(2, 'Nhập trên 2 kí tự')
        .max(200, 'Nhập dưới 200 kí tự'),
    email: yup.string()
        .required("Email không được để trống")
        .matches(/^.+@.+\..+$/, "Email không hợp lệ"),
    hotline: yup.string()
        .required("Số điện thoại không được để trống")
        .matches(/^(02|03|07|09)\d{8}$/, "Số điện thoại bắt đầu bằng 02;03;07;09 và gồm 10 chữ số"),
    operatingLicence: yup.string()
        .required("GPHĐ không đuược để trống")
        .min(5, 'Nhập trên 5 kí tự')
        .max(30, 'Nhập dưới 30 kí tự'),
    clinicLogo: yup.mixed().test("file", "Logo không được để trống", (value) => {
        if (value.length > 0) {
            return true;
        }
        return false;
    }),
})

const StyledErrorText = styled('p')({
    color: '#d32f2f',
    fontSize: '14px',
    marginTop: '8px',
});
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none'
}));
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
function CustomerDashboard() {
    const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({ resolver: yupResolver(schema) });
    let updateAvatar;
    let presentAvatar;
    const resetModal = () => {
        // setShow(false)
        // setShowContent(true)
        // setShowCreateBtn(true)
        // setShowPagination(true)
    }
    //
    // useEffect(() => {
    //     if (clinicId) {
    //         const getClinic = async () => {
    //             const res = await axios.get(`http://localhost:8080/api/clinic/${clinicId}`);
    //             const result = await res.data;
    //             setValue("clinicName", result.clinicName)
    //             setValue("legalRepresentative", result.legalRepresentative)
    //             setValue("email", result.email)
    //             setValue("hotline", result.hotline)
    //             setValue("operatingLicence", result.operatingLicence)
    //             setValue("address", result.address)
    //             setValue("clinicInfo", result.clinicInfo)
    //             presentAvatar = result.clinicLogo;
    //             updateAvatar = result.clinicLogo;
    //             document.getElementById('blah').src = presentAvatar;
    //         }
    //         getClinic();
    //     }
    // }, [clinicId]);


    const handleUpdateClinic = async (data) => {
        // if (presentAvatar === updateAvatar) {
        //     data.clinicLogo = presentAvatar;
        // } else {
        //     data.clinicLogo = updateAvatar;
        // }
        // try {
        //     await axios.put(`http://localhost:8080/api/clinic/${clinicId}`, data);
        //     toast.success("Cập nhật phòng khám thành công!")
        //     reset();
        //     // setShowContent(true)
        //     // setShowCreateBtn(true)
        //     // setShow(false)
        //     // setShowPagination(true)
        //     // setISupdate(prev => !prev);
        // } catch (error) {
        //     toast.error("Cập nhật phòng khám thất bại!")
        // }
    };

    const handleUpload = async (e) => {
        let imagesImport = Array.from(e.target.files);
        const formData = new FormData();
        formData.append('image', imagesImport[0])
        const res = await axios.post('http://localhost:8080/api/avatar', formData)
        updateAvatar = await res.data.fileUrl
        document.getElementById('blah').src = updateAvatar;
    }
    return (
        <div>
            <Header/>
            <Container sx={{justifyContent: 'center'}}>
                <Link to="/home" underline="none" sx={{display: 'flex', textDecoration: 'none'}}>
                    <House sx={{marginRight: '0.5rem'}}/>
                    <Typography variant="body1" sx={{marginLeft: '0.5rem'}}>
                        / Thông tin cá nhân
                    </Typography>
                </Link>
                <Typography variant="h4" mt={3} component="h4" >Thông tin cá nhân</Typography>
                <Box component="form" onSubmit={handleSubmit(handleUpdateClinic)} sx={{ width: '100%' }} mt={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} >
                            <Item>
                                <Button component="label" sx={{ borderRadius: 50 }}>
                                    <img id={"blah"} style={{ borderRadius: 100 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Circle-icons-upload.svg/1200px-Circle-icons-upload.svg.png" width={170} height={170}
                                         alt={"avatar"} />
                                    <VisuallyHiddenInput  {...register("clinicLogo")} type="file" onChange={(event) => {
                                        handleUpload(event)
                                    }} />
                                </Button>
                                {errors?.clinicLogo && <StyledErrorText>{errors?.clinicLogo?.message}</StyledErrorText>}
                                <Typography variant="p" fontWeight={"bold"} component="p" mt={1}>
                                    Tải ảnh đại diện tại đây
                                </Typography>
                                <Typography fontSize={12} fontStyle={"italic"}>
                                    Chỉ cho phép các định dạng *.jpeg, *.jpg, *.png, *.gif kích thước tối đa 1MB
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={9}>
                            <Item >
                                <Box sx={{ mt: 3 }}>
                                    <Grid container spacing={2} >
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="fullName"
                                                fullWidth
                                                id="fullName"
                                                label="Tên"
                                                type="text"
                                                InputLabelProps={{ shrink: true }}
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
                                                InputLabelProps={{ shrink: true }}
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
                                                InputLabelProps={{ shrink: true }}
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
                                                error={Boolean(errors.email)}
                                                helperText={errors.email?.message || ''}
                                                {...register("email")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="hotline"
                                                fullWidth
                                                id="hotline"
                                                label="Hotline"
                                                type="tel"
                                                InputLabelProps={{ shrink: true }}
                                                error={Boolean(errors.hotline)}
                                                helperText={errors.hotline?.message || ''}
                                                {...register("hotline")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="operatingLicence"
                                                fullWidth
                                                id="operatingLicence"
                                                type={"text"}
                                                InputLabelProps={{ shrink: true }}
                                                label="Giấy phép hoạt động"
                                                error={Boolean(errors.operatingLicence)}
                                                helperText={errors.operatingLicence?.message || ''}
                                                {...register("operatingLicence")}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid item container xs={12} sm={6} >
                                <Button
                                    variant="contained"
                                    color="success"
                                    type={"submit"}
                                    sx={{ mt: 3, mb: 1, mr: 1 }}
                                >
                                    Cập nhật
                                </Button>
                                <Button variant="contained" onClick={resetModal}
                                        sx={{ mt: 3, mb: 1 }}>
                                    Hủy
                                </Button>
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